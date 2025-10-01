const Mongoose = require("mongoose");

const categorySchema = new Mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    keyTitle: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("Category", categorySchema, "categories");
