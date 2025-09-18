var express = require('express');
var router = express.Router();

/* POST login */
router.post('/', function(req, res, next) {
  const body = req.body;
  const isUserValid = (body.email === 'admin@admin.com' && body.password === '123456');

  if (!!isUserValid) {
    res.status(200).send({data: body, message: 'Login successful'});
  } else {
    res.status(401).send({message: 'Invalid email or password'});
  }
});

module.exports = router;
