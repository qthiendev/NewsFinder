const { tryGetSpecific } = require('../models/get.specific.model');

const getSpecific = async (req, res) => {
    try {
        const { subtitle } = req.query;

        if (!subtitle) {
            return res.status(400).send(`'subtitle' is invalid.`);
        }

        const startTime = Date.now();

        const data = await tryGetSpecific(subtitle);

        const executionTime = Date.now() - startTime;

        const currentTime = new Date().toLocaleString();

        res.render('findResult', { data, currentTime, executionTime });

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('An internal server error occurred.');
    }
};

module.exports = { getSpecific };
