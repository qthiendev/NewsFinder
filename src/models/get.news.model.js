const ndb = require('./database.model');

const tryGetNews = async (id) => {
    try {
        if (Number.isNaN(id)) {
            throw new Error(`Invalid index if: ${id}`);
        }

        const data = await ndb.query('EXECUTE GetNews @id', { id });

        return data;

    } catch (err) {
        throw new Error(`get.news.model.js/tryGetNews  | ${err.message}`);
    }
};

module.exports = { tryGetNews };
