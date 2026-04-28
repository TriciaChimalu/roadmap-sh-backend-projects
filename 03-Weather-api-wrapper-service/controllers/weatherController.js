const asyncHandler = require("express-async-handler");
const redisClient = require("../config/redisClient");

const weatherData = asyncHandler(async (req, res) => {
  const city = req.query.city.toLocaleLowerCase();

  const api_key = process.env.API_KEY;
  if (!city) {
    res.status(400);
    throw new Error("city not found");
  }
  //check redis first
  let result = null;
  const key = "city" + city;
  const value = await redisClient.get(key);
  console.log("value from redis:", value);

  //found? return it cache hit
  if (value) {
    result = JSON.parse(value);
    console.log("cache hit");
  } else {
    //not found? call openweathermap,save to redis and return cache miss

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    result = await response.json();
    //save to redis
    await redisClient.set(key, JSON.stringify(result), {
      EX: 300,
    });
    console.log("cache miss");
  }

  res.status(200).json(result);
});

module.exports = { weatherData };
