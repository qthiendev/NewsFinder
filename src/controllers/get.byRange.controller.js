const { tryGetByRange } = require('../models/get.byRange.model');

const getByRange = async (req, res) => {
    try {
        const p = parseInt(req.query.p, 10) || 0;

        if (p < 0 || p > 9) {
            return res.status(400).send('Invalid page number. It should be between 0 and 9.');
        }
        const startTime = Date.now();

        const start = p * 2000;
        const end = start + 1999;

        const data = await tryGetByRange(start, end);

        const executionTime = Date.now() - startTime;

        const currentTime = new Date().toLocaleString();

        res.render('homePage', { data, currentPage: p, currentTime, executionTime});

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('An internal server error occurred.');
    }
};

module.exports = { getByRange };
