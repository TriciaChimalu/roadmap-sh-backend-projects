require("dotenv").config();
const express = require("express");
const app = express();
const errorHandler = require("./Middleware/errorHandler");
const prisma = require("./lib/db");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", require("./Route/authRoute"));
app.use("/api/tasks", require("./Route/todoRoute"));

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
