require("express-async-errors");
require("dotenv").config();
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use("/auth", require("./routes/authRoute"));
app.use("/expense", require("./routes/expenseRouter"));

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
