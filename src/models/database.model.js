const sql = require("mssql");

let connection;

const tryConnect = async () => {
    try {
        const config = {
            driver: "msnodesqlv8",
            user: "sa",
            password: '123456',
            server: "localhost",
            database: "NewspaperDB",
            options: {
                port: 1433,
                encrypt: true,
                trustServerCertificate: true,
            },
        };

        connection = new sql.ConnectionPool(config);

        await connection.connect();

    } catch (err) {
        throw new Error(`tryConnect | ${err.message}`);
    }
};

const closeConnect = async () => {
    try {
        if (connection && connection.connected) {
            await connection.close();
        } else {
            throw new Error(`There is no NewspaperDB connection to close.`);
        }
    } catch (err) {
        throw new Error(`closeConnect | ${err.message}`);
    }
};

const query = async (queryString, params = {}) => {
    try {
        await tryConnect();

        if (!connection || !connection.connected)
            throw new Error(`There is no NewspaperDB connection to query.`);

        const request = connection.request();

        for (const [key, value] of Object.entries(params)) {
            request.input(key, value);
        }

        const results = await request.query(queryString);

        console.log(`[${new Date().toLocaleString()}] at database.model.js/query | Queried NewspaperDB: ${queryString} -> ${JSON.stringify(params)}`);

        await closeConnect();

        return results.recordset;
    } catch (err) {
        throw new Error(`database.model.js/query | ${err.message}`);
    }
};

module.exports = { query };