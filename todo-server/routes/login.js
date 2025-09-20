var express = require('express');
const { validateUser } = require('../controllers/authController');
var router = express.Router();

/* POST login */
router.post('/', validateUser);

module.exports = router;
