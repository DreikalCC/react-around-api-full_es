require('dotenv').config();
const express = require("express");
const app = express();
const { PORT, BASE_PATH } = process.env;
const path = require("path");
const mongoose = require("mongoose");
const auth = require("./middlewares/auth");

const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards");

mongoose.connect("mongodb://localhost:27017/aroundb");

app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
  console.log(BASE_PATH);
});

app.use(express.static(path.join(__dirname, "data")));

app.use("/", express.json());
app.use("/", express.urlencoded({ extended: true }));

app.post("/login", login);
app.post("/signup", createUser);
//antes de esta linea no requieren auth, despues de si requieren auth según la teoria
app.use(auth);
app.use("/users", usersRoute);
app.use("/cards", cardsRoute);
app.use("/", (req, res) => {
  res
    .status(404)
    .send({ status: false, message: "Requested resource not found" });
});