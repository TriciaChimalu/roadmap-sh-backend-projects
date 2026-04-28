const express = require("express");
const router = express.Router();
const { weatherData } = require("../controllers/weatherController");

router.route("/").get(weatherData);

module.exports = router;
