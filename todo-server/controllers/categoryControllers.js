const Category = require("../models/categoryModel");
const mongoose = require("mongoose");

const getAllCategories = async (req, res) => {
  console.log(typeof req.user._id);

  try {
    const categories = await Category.find({
      user: req.user._id,
    });
    res.status(200).send({
      data: categories || [],
      message: "Categories fetched successfully",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, keyTitle } = req.body;
    const newCategory = new Category({ name, keyTitle, user: req.user._id });
    await newCategory.save();
    res
      .status(201)
      .send({ data: newCategory, message: "Category created successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = { getAllCategories, createCategory };
