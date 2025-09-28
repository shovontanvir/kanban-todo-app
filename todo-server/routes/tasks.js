const express = require("express");
const router = express.Router();
const Task = require("../models/taskModel");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { createTask } = require("../controllers/taskControllers");

// POST /tasks - Add a new task
router.post("/", authMiddleware, createTask);

module.exports = router;
