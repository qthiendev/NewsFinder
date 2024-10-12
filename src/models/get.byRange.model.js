const ndb = require('./database.model');

const tryGetByRange = async (start, end) => {
    try {
        if (start < 0 || (start > end))
            throw new Error(`Invalid index start:${start}, end:${end}`);

        const data = await ndb.query('EXECUTE GetByRange @start, @end', { start, end });

        return data;

    } catch (err) {
        throw new Error(`get.byRange.model.js/tryGetByRange | ${err.message}`);
    }
};

module.exports = { tryGetByRange };