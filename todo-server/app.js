var express = require('express');
var cors = require('cors');

var indexRouter = require('./routes/index');

var app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use('/', indexRouter);

module.exports = app;
