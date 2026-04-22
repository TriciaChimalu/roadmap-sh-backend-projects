require("dotenv").config();

const express = require("express");
const app = express();
const errorHandler = require("./Middleware/errorHandler");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/post", require("./Route/blogRoute"));

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on server ${PORT}`);
});
