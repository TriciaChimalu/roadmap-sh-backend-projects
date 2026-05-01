const prisma = require("../lib/db");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(400);
    throw new Error("Authorization Failed, no token found!");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    next();
  } catch (err) {
    res.status(401);
    throw new Error("not authorized, token failed");
  }
};
module.exports = protect;
