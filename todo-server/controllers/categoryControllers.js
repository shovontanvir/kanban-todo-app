const Category = require("../models/categoryModel");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res
      .status(200)
      .send({ data: categories, message: "Categories fetched successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, keyTitle } = req.body;
    const newCategory = new Category({ name, keyTitle });
    await newCategory.save();
    res
      .status(201)
      .send({ data: newCategory, message: "Category created successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = { getAllCategories, createCategory };
