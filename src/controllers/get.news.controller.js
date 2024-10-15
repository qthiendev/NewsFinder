const { tryGetNews } = require('../models/get.news.model');

const getNews = async (req, res) => {
    try {
        const { id, subtitle = '' } = req.query;

        if (!id || Number.isNaN(Number(id))) {
            return res.status(400).send(`'id' is invalid.`);
        }

        const startTime = Date.now();
        const data = await tryGetNews(id);

        console.log(data[0]);

        res.render('newsPage', {
            data: data[0],
            currentTime: new Date().toLocaleString(),
            executionTime: Date.now() - startTime,
            subtitle
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('An internal server error occurred.');
    }
};

module.exports = { getNews };
