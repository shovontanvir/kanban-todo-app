const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const signupController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res
      .status(201)
      .send({ message: "User created successfully", data: newUser });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send({ message: "Server error" });
  }
};

module.exports = signupController;
