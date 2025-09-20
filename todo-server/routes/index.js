var express = require('express');
var router = express.Router();
var {authMiddleware} = require('../middlewares/authMiddleware');

/* GET home */
router.get('/', function(req, res, next) {
  res.send({ title: 'To Do Backend', message: 'Welcome to To Do Backend' });
});

module.exports = router;
