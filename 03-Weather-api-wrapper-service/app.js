require("dotenv").config();
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const PORT = process.env.PORT || 3000;
const redisClient = require("./config/redisClient");

(async () => {
  redisClient.on("error", (err) => {
    console.log("Redis client error", err);
  });

  redisClient.on("ready", () => {
    console.log("Redis Client started");
  });

  await redisClient.connect();
  await redisClient.ping();
})();

app.use(express.json());

app.use("/api/weather", require("./routes/weatherRoutes"));

app.use(errorHandler);
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
