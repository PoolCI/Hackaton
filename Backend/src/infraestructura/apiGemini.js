const axios = require('axios');
const { getDatabaseSchema } = require('./db');

const GEMINI_API_URL = "https://api.gemini.com/generate";
const API_KEY = process.env.GEMINI_API_KEY;

const getGeminiQuery = async (query, tenantId) => {
    const schema = await getDatabaseSchema();
    const prompt = `Aquí está la estructura de mi base de datos multi-tenant: ${JSON.stringify(schema)}. Genera una consulta SQL para: ${query} dentro del tenant con ID = ${tenantId}`;

    try {
        const response = await axios.post(GEMINI_API_URL, {
            query: prompt
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.result;
    } catch (error) {
        console.error("Error en la API de Gemini:", error);
        throw new Error("Fallo al obtener respuesta de Gemini");
    }
};

module.exports = { getGeminiQuery };