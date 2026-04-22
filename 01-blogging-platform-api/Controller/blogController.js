const prisma = require("../lib/db");
const asyncHandler = require("express-async-handler");

const getAllPosts = asyncHandler(async (req, res) => {
  const tag = req.query.tag;

  let post;

  if (tag) {
    post = await prisma.post.findMany({
      where: {
        tags: {
          some: {
            name: tag,
          },
        },
      },
    });
  } else {
    post = await prisma.post.findMany();
  }
  if (post.length === 0) {
    res.status(404);
    throw new Error("No Post Found");
  }
  res.status(200).json(post);
});

const getSinglePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
  });
  if (!post) {
    res.status(404);
    throw new Error(`post does not exist`);
  }
  res.status(200).json(post);
});
const createPost = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content || !tags) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const post = await prisma.post.create({
    data: {
      title,
      content,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
  });

  res.status(201).json(post);
});

const deletePost = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const post = await prisma.post.findUnique({
    where: { id },
  });
  if (!post) {
    res.status(400);
    throw new Error(`Post doesn't exist`);
  }
  await prisma.post.delete({ where: { id } });
  res.status(200).json({ message: "post deleted successfully" });
});

const updatePost = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, tags } = req.body;
  const post = await prisma.post.findUnique({
    where: { id },
  });
  if (!post) {
    res.status(404);
    throw new Error(`Post not Found`);
  }
  await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
  });
  res.status(200).json({ message: "post updated successfully" });
});

module.exports = {
  updatePost,
  createPost,
  getAllPosts,
  getSinglePost,
  deletePost,
};
