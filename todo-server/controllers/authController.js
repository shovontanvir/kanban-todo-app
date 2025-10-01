var jwt = require("jsonwebtoken");
var User = require("../models/userModel");
var Token = require("../models/tokenModel");
var bcrypt = require("bcrypt");
var mongoose = require("mongoose");

require("dotenv").config();

const validateUser = async (req, res) => {
  const requestedUser = req.body;

  const user = await User.findOne({ email: requestedUser.email }); // Find user by email

  if (!user) return res.status(404).send({ message: "User not found" }); // If user not found, return 404

  // Compare plain password with hashed password
  const isPasswordValid = await bcrypt.compare(
    requestedUser.password,
    user.password
  );
  if (!isPasswordValid)
    return res.status(404).send({ message: "Incorrect Password" }); // If password does not match, return 404

  const accessToken = jwt.sign(
    user.toObject(),
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "60m",
    }
  ); // Generate JWT token

  const newToken = new Token({
    userId: new mongoose.Types.ObjectId(user._id),
    token: accessToken,
  });
  await newToken.save(); // Save token to database

  res.status(200).send({
    data: {
      user,
      accessToken,
      message: "Login successful",
    },
  });
};

module.exports = { validateUser };
