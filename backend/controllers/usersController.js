const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
//const { NODE_ENV, JWT_SECRET } = process.env;

const NotFoundError = require("../errors/not-found");

function onOrFail() {
  throw new NotFoundError("No se ha encontrado ningún usuario");
}

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail(onOrFail)
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch(
      next
    );
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    //.select("+password")
    //.orFail(onOrFail)
    .then((user) => {
      const token = jwt.sign(
        {
          _id: user._id,
        },
        "secret-key",
        { expiresIn: "7d" }
      );
      res.send({ user, token, message: "¡Bienvenido de vuelta!" });
    })
    .catch(
      next
    );
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.params.id)
    //.select('+password')
    .orFail(onOrFail)
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch(
      next
    );
};

module.exports.getSpecificUser = (req, res, next) => {
  User.findById(req.user._id)
    //.select('+password')
    .orFail(onOrFail)
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch(
      next
    );
};

module.exports.createUser = (req, res, next) => {
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


module.exports.updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.updateOne({_id: userId}, { name, about })
    //.select('+password')
    .orFail(onOrFail)
    .then(()=>User.findById(userId))
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch(
      next
    );
};

module.exports.updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.updateOne({_id: userId} , { avatar })
    //.select('+password')
    .orFail(onOrFail)
    .then(()=>User.findById(userId))
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch(
      next
    );
};
