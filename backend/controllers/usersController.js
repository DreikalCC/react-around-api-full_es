const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;

const NotFoundError = require("../errors/not-found");

function onOrFail() {
  throw new NotFoundError("No se ha encontrado ningún usuario");
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(onOrFail)
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch(
      next
    );
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .select("+password")
    .orFail(onOrFail)
    .then((user) => {
      const token = jwt.sign(
        {
          _id: user._id,
        },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" }
      );
      res.send({ token, message: "¡Bienvenido de vuelta!" });
    })
    .catch(
      next
    );
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(onOrFail)
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch(
      next
    );
};

module.exports.getSpecificUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(onOrFail)
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch(
      next
    );
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 6)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      res.status(201).send({
        email: user.email,
        _id: user._id,
      });
    })
    .catch(
      next
    );
};

module.exports.updateProfile = (req, res) => {
  const { userId } = req.params.id;
  const { name, about } = req.body;
  User.updateOne({ _id: userId }, { name, about })
    .orFail(onOrFail)
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch(
      next
    );
};

module.exports.updateAvatar = (req, res) => {
  const { userId } = req.params.id;
  const { avatar } = req.body;
  User.updateOne({ _id: userId }, { avatar })
    .orFail(onOrFail)
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch(
      next
    );
};
