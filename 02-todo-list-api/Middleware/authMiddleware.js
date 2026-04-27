const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const prisma = require("../lib/db");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401);
    throw new Error("Authorization Failed,token not found");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  next();
});

module.exports = { protect };
