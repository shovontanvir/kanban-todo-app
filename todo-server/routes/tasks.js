const express = require("express");
const router = express.Router();
const Task = require("../models/taskModel");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createTask,
  getAllTasks,
  updateTaskById,
} = require("../controllers/taskControllers");

// GET /tasks - Get all tasks for the authenticated user
router.get("/", authMiddleware, getAllTasks);

// POST /tasks - Add a new task
router.post("/", authMiddleware, createTask);

// PUT /tasks/:id - Update a task by ID
router.put("/:id", authMiddleware, updateTaskById);

module.exports = router;
