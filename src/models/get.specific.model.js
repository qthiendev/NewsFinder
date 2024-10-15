const ndb = require('./database.model');

const tryGetSpecific = async (subtitle) => {
    try {
        if (!subtitle) {
            throw new Error(`Invalid index subtitle: ${subtitle}`);
        }

        const data = await ndb.query('EXECUTE Find @subtitle', { subtitle });

        return data;
    } catch (err) {
        throw new Error(`get.specific.model.js/tryGetSpecific | ${err.message}`);
    }
};

module.exports = { tryGetSpecific };
