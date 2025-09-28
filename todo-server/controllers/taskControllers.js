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

const updateTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status, dueDate } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: req.user._id },
      { title, description, status, dueDate },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(204).json(null);
  } catch (error) {
    console.log(req);

    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findOneAndDelete({
      _id: taskId,
      user: req.user._id,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(204).json(null);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllTasks, createTask, updateTaskById, deleteTaskById };
