const { tryGetNews} = require('../models/get.news.model');

const getNews = async (req, res) => {
    try {
        const { id } = req.query;

        if (Number.isNaN(id)) {
            return res.status(400).send(`'id is invalid.`);
        }

        const startTime = Date.now();

        const data = await tryGetNews(id);

        const executionTime = Date.now() - startTime;

        const currentTime = new Date().toLocaleString();
        
        console.log(data[0])

        res.render('newsPage', { data: data[0], currentTime, executionTime });

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('An internal server error occurred.');
    }
};

module.exports = { getNews };
