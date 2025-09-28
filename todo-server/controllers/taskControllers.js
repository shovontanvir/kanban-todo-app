const Task = require("../models/taskModel");

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

module.exports = { createTask };
