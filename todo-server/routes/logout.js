const express = require("express");
const { logOutUser } = require("../controllers/logOutController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, logOutUser);

module.exports = router;
