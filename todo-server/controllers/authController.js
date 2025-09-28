var jwt = require("jsonwebtoken");
var User = require("../models/userModel");
var Token = require("../models/tokenModel");

require("dotenv").config();

const validateUser = async (req, res) => {
  const requestedUser = req.body;

  const user = await User.findOne({ email: requestedUser.email }); // Find user by email

  if (!user) return res.status(404).send({ message: "User not found" }); // If user not found, return 404

  if (!!user && user.password !== requestedUser.password)
    return res.status(404).send({ message: "Incorrect Password" }); // If password does not match, return 404

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "60m",
  }); // Generate JWT token

  const newToken = new Token({ userId: user._id, token: accessToken });
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
