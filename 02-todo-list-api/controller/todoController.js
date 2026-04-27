const prisma = require("../lib/db");
const asyncHandler = require("express-async-handler");

const getAllTask = asyncHandler(async (req, res) => {
  const status = req.query.status;
  let task;
  let where = { userId: req.user.id };

  if (status === "completed") {
    where.completed = true;
  } else if (status === "uncompleted") {
    where.completed = false;
  }
  task = await prisma.task.findMany({ where });
  res.status(200).json(task);
});

const getSingleTask = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);

  const task = await prisma.task.findFirst({
    where: { id, userId: req.user.id },
  });
  if (!task) {
    res.status(400);
    throw new Error("Task not Found");
  }
  res.status(200).json(task);
});

const createTask = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(400);
    throw new Error("Add Title");
  }
  const task = await prisma.task.create({
    data: { title, userId: req.user.id },
  });
  res.status(201).json(task);
});

const updateTask = asyncHandler(async (req, res) => {
  const { title, completed } = req.body;
  const id = parseInt(req.params.id);

  const task = await prisma.task.findFirst({
    where: { id, userId: req.user.id },
  });

  if (!task) {
    res.status(400);
    throw new Error("update your task");
  }
  await prisma.task.update({
    where: { id },
    data: req.body,
  });

  res.status(200).json({ message: "updated task" });
});

const deleteTask = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);

  const task = await prisma.task.findFirst({
    where: { id, userId: req.user.id },
  });

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }
  await prisma.task.delete({
    where: { id },
  });
  res.status(200).json({ message: " Task deleted successfully" });
});

module.exports = {
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
  createTask,
};
