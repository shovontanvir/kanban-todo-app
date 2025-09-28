const Task = require("../models/taskModel");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ data: tasks, message: "Tasks fetched successfully" });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status, deadline } = req.body;
    const task = new Task({ title, description, status, deadline });
    await task.save();
    res.status(201).json({ data: task, message: "Task created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getAllTasks, createTask };
