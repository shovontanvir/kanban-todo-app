var jwt = require('jsonwebtoken');
const Token = require('../models/tokenModel');

require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401);

    const tokenInDB = await Token.findOne({ token });
  
    if (!tokenInDB) return res.status(403).send({ message: 'Invalid token' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).send({ message: 'Token expired' });
      req.user = user;
      next();
    });
  };
  
  module.exports = { authMiddleware};