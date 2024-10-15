const ndb = require('./database.model');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 600 });

const tryGetNews = async (id) => {
    try {
        if (Number.isNaN(id)) {
            throw new Error(`Invalid index id: ${id}`);
        }

        const cachedData = cache.get(id);
        if (cachedData) {
            return cachedData;
        }

        const data = await ndb.query('EXECUTE GetNews @id', { id });

        cache.set(id, data);

        return data;

    } catch (err) {
        throw new Error(`get.news.model.js/tryGetNews | ${err.message}`);
    }
};

module.exports = { tryGetNews };
