const { tryGetByRange } = require('../models/get.byRange.model');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 600 });

const getByRange = async (req, res) => {
    try {
        const { subtitle = '' } = req.query; // Destructure subtitle with default value
        const p = parseInt(req.query.p, 10) || 0; // Parse page number

        if (p < 0 || p > 9) {
            return res.status(400).send('Invalid page number. It should be between 0 and 9.');
        }

        const startTime = Date.now();
        const start = p * 2000;
        const end = start + 1999;

        const cacheKey = `${start}-${end}`;

        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            console.log(`Cache hit for range: ${cacheKey}`);
            return res.render('homePage', {
                data: cachedData,
                currentPage: p,
                currentTime: new Date().toLocaleString(),
                executionTime: Date.now() - startTime,
                subtitle // Pass subtitle to the render function
            });
        }

        const data = await tryGetByRange(start, end);
        cache.set(cacheKey, data);
        console.log(`Data cached for range: ${cacheKey}`);

        res.render('homePage', {
            data,
            currentPage: p,
            currentTime: new Date().toLocaleString(),
            executionTime: Date.now() - startTime,
            subtitle // Pass subtitle to the render function
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('An internal server error occurred.');
    }
};

module.exports = { getByRange };
