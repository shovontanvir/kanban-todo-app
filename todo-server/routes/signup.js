const express = require("express");
const User = require("../models/userModel");
const signupController = require("../controllers/signupController");

const router = express.Router();

router.post("/", signupController);

module.exports = router;
