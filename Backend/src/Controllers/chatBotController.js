const express = require('express');
const router = express.Router();
const { executeQuery } = require('../infraestructura/queryExecutor');
const { getGeminiQuery } = require('../infraestructura/apiGemini');

router.post('/chatbot', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const tenantId = req.body.tenantId;

        // Obtiene la consulta SQL generada por Gemini
        const sqlQuery = await getGeminiQuery(userMessage, tenantId);

        // Ejecuta la consulta en la BD del tenant
        const dbData = await executeQuery(sqlQuery);

        res.json({ sqlQuery, dbData });
    } catch (error) {
        console.error("Error en chatbot:", error);
        res.status(500).json({ error: 'Fallo en el procesamiento' });
    }
});

module.exports = router;