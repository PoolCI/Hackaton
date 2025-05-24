const pool = require('../infraestructura/baseDatos');

const getDatabaseSchema = async () => {
    const query = `
        SELECT TABLE_NAME, COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = 'nombre_de_tu_base_datos'
    `;
    const [rows] = await pool.query(query);

    const schema = rows.reduce((acc, row) => {
        acc[row.TABLE_NAME] = acc[row.TABLE_NAME] || [];
        acc[row.TABLE_NAME].push(row.COLUMN_NAME);
        return acc;
    }, {});
    
    return schema;
};

module.exports = { getDatabaseSchema };
