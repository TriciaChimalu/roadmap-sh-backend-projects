const prisma = require("../lib/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });
  res.status(201).json({ id: user.id, email: user.email });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    res.status(400);
    throw new Error("Please Sign up");
  }

  const hashedPassword = user.password;
  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (!isMatch) {
    res.status(400);
    throw new Error("Incorrect password");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ token });
};

module.exports = { register, login };
