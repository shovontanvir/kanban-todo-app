var express = require('express');
var cors = require('cors');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use('/', indexRouter);
app.use('/login', loginRouter);

module.exports = app;
