const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;

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

/*
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(onOrFail)
    .then((user) => {
      if (!user) {
        throw new AuthError('email o contraseña incorrectos');
      }
      req._id = user._id;
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(('email o contraseña incorrectos'));
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: req._id },
        'dev-secret',
        { expiresIn: '7d' },
      );
      res.header('authorization', `Bearer ${token}`);
      res.cookie('token', token, { httpOnly: true });
      res.status(200).send({ token, name: user.name, email: user.email });
    })
    .catch(next);
};*/


module.exports.login = (req, res, next) => {
  console.log('corriendo el login');
  const { email, password } = req.body;
  return User.findUserByCredentials({email, password})
    .select("+password")
    .orFail(onOrFail)
    .then((user) => {
      console.log('user al hacer login  ',user);
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

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(onOrFail)
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch(
      next
    );
};

module.exports.getSpecificUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(onOrFail)
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch(
      next
    );
};

module.exports.createUser = (req, res, next) => {
  console.log('corriendo el registro de user');
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

module.exports.updateAvatar = (req, res, next) => {
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
