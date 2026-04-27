const express = require("express");
const router = express.Router();
const { protect } = require("../Middleware/authMiddleware");
const {
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
  createTask,
} = require("../controller/todoController");

router.route("/").post(protect, createTask).get(protect, getAllTask);
router
  .route("/:id")
  .put(protect, updateTask)
  .get(protect, getSingleTask)
  .delete(protect, deleteTask);

module.exports = router;
