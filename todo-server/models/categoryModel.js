const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    keyTitle: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

categorySchema.index({ name: 1, user: 1 }, { unique: true });
categorySchema.index({ keyTitle: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Category", categorySchema, "categories");
