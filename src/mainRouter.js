const express = require("express");
const router = express.Router();
const { getByRange } = require("./controllers/get.byRange.controller");
const { getSpecific } = require("./controllers/get.specific.controller");
const { getNews } = require("./controllers/get.news.controller");

router.get("/", getByRange);
router.get("/find", getSpecific);
router.get("/news", getNews);

module.exports = router;
