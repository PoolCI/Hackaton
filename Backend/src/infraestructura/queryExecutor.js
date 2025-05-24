const pool = require('./baseDatos'); // Importa la conexión con MariaDB

const executeQuery = async (sqlQuery) => {
    try {
        const [rows] = await pool.query(sqlQuery);
        return rows;
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        throw new Error("Fallo en la ejecución de la consulta SQL");
    }
};

module.exports = { executeQuery };
