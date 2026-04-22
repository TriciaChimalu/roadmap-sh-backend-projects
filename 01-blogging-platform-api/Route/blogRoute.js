const express = require("express");
const router = express.Router();
const {
  updatePost,
  createPost,
  getAllPosts,
  getSinglePost,
  deletePost,
} = require("../Controller/blogController");
router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").get(getSinglePost).put(updatePost).delete(deletePost);

module.exports = router;
