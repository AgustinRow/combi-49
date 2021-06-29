var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const vehiculoRouter = require("./routes/vehiculo");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/usuario");
const ciudadRouter = require("./routes/ciudad");
const rutasRouter = require("./routes/ruta");
const viajeRouter = require("./routes/viaje");
const provinciaRouter = require("./routes/provincia");
const pasajeRouter = require("./routes/pasaje");
const viandaRouter = require("./routes/vianda");
const valoracionRouter = require("./routes/valoracion");
const testRouter = require("./routes/test");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:4200"], credentials: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/ciudad", ciudadRouter);
app.use("/api/usuario", usersRouter);
app.use("/api/ruta", rutasRouter);
app.use("/api/vehiculo", vehiculoRouter);
app.use("/api/viaje", viajeRouter);
app.use("/api/provincia", provinciaRouter);
app.use("/api/pasaje", pasajeRouter);
app.use("/api/vianda", viandaRouter);
app.use("/api/valoracion", valoracionRouter);
app.use("/api/test", testRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
