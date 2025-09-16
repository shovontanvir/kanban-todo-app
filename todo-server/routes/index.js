var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'To Do Backend', message: 'Welcome to To Do Backend' });
});

module.exports = router;
