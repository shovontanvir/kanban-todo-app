const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  getAllCategories,
  createCategory,
} = require("../controllers/categoryControllers");

// get all categories
router.get("/", authMiddleware, getAllCategories);

// Create a new category
router.post("/", authMiddleware, createCategory);

module.exports = router;
