const config = require('dotenv').config;
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cors = require("cors");
const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards");
const { errors } = require("celebrate");
const { login, createUser } = require('./controllers/usersController')

config();

const { PORT } = process.env;

console.log(process.env);

mongoose.connect("mongodb://127.0.0.1:27017/aroundb");

app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
});

app.use(express.static(path.join(__dirname, "data")));

app.use(cors());
app.options('*', cors());

app.use("/", express.json());
app.use("/", express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post("/login", login);
app.post("/signup", createUser);
//antes de esta linea no requieren auth, despues de si requieren auth según la teoria
//app.use(auth);
app.use("/users", auth, usersRoute);
app.use("/cards", auth, cardsRoute);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});
/*
app.use("/", (req, res) => {
  res
    .status(404)
    .send({ status: false, message: "Requested resource not found" });
});*/
