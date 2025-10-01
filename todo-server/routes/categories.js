const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const { createCategory } = require("../controllers/categoryControllers");

// Create a new category
router.post("/", authMiddleware, createCategory);

module.exports = router;
