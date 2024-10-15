const { tryGetSpecific } = require('../models/get.specific.model');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 });

const getSpecific = async (req, res) => {
    try {
        const { subtitle = '' } = req.query;

        const startTime = Date.now();

        const cachedData = cache.get(subtitle);
        if (cachedData) {
            console.log(`Cache hit for subtitle: ${subtitle}`);
            return res.render('findResult', {
                data: cachedData,
                currentTime: new Date().toLocaleString(),
                executionTime: Date.now() - startTime,
                subtitle
            });
        }

        const data = await tryGetSpecific(subtitle);

        if (!data) {
            console.log(`No data found for subtitle: ${subtitle}`);
            return res.render('findResult', {
                data: [],
                currentTime: new Date().toLocaleString(),
                executionTime: Date.now() - startTime,
                subtitle 
            });
        }

        cache.set(subtitle, data);
        console.log(`Data cached for subtitle: ${subtitle}`);

        res.render('findResult', {
            data,
            currentTime: new Date().toLocaleString(),
            executionTime: Date.now() - startTime,
            subtitle
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('An internal server error occurred.');
    }
};

module.exports = { getSpecific };
