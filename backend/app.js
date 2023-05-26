const config = require('dotenv').config;
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cors = require("cors");
const usersRoute = require("./routes/usersRoutes");
const cardsRoute = require("./routes/cardsRoutes");
const { errors } = require("celebrate");
const { login, createUser } = require('./controllers/usersController')

config();

const { PORT } = process.env;

console.log(process.env);

mongoose.connect("mongodb+srv://testaldo:test123456@cluster0.hqf55.mongodb.net/aroundb?retryWrites=true&w=majority");

app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
});

app.use(express.static(path.join(__dirname, "data")));

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
}); 

app.use("/users", auth, usersRoute);
app.use("/cards", auth, cardsRoute);

app.post("/login", login);
app.post("/signup", createUser);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode).send({ message: err.message });
});

