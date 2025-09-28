var express = require("express");
var cors = require("cors");

var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login");
var taskRouter = require("./routes/tasks");
var logoutRouter = require("./routes/logout");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/tasks", taskRouter);
app.use("/logout", logoutRouter);

module.exports = app;
