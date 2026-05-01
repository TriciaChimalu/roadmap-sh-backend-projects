const protect = require("../middlewares/authMiddleware");
const express = require("express");
const router = express.Router();

const {
  getAllExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
  getSingleExpense,
} = require("../controllers/expenseControllers");

router.route("/").post(protect, createExpense).get(protect, getAllExpenses);
router
  .route("/:id")
  .get(protect, getSingleExpense)
  .put(protect, updateExpense)
  .delete(protect, deleteExpense);

module.exports = router;
