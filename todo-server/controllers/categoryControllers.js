const Category = require("../models/categoryModel");

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

module.exports = { createCategory };
