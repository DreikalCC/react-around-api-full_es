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
  console.log('corriendo el login');
  const { email, password } = req.body;
  console.log('login credential find back',User.findUserByCredentials(email, password));
  return User.findUserByCredentials(email, password)
    //.select("+password")
    //.orFail(onOrFail)
    .then((user) => {
      console.log('user al hacer login  ',user);
      const token = jwt.sign(
        {
          _id: user._id,
        },
        /*NODE_ENV === "production" ? JWT_SECRET :*/ "secret-key",
        { expiresIn: "7d" }
      );
      res.send({ user, token, message: "¡Bienvenido de vuelta!" });
    })
    .catch(
      next
    );
};

module.exports.getCurrentUser = (req, res, next) => {
  console.log('log current user back  ', req);
  User.findById(req.params.id)
    .select('+password')
    .orFail(onOrFail)
    .then((data) => {
      console.log('data del getcurrent res.send   ', data);
      res.send({ status: true, data: data });
    })
    .catch(
      next
    );
};

module.exports.getSpecificUser = (req, res, next) => {
  console.log('req del specificuser ', req.user);
  User.findById(req.user._id)
    .orFail(onOrFail)
    .then((data) => {
      console.log('data del specificuser del usercontroller ', data)
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
  console.log('update prof controller params', req.user);
  console.log('update prof controller body', req.body);
  const { userId } = req.user._id;
  const { name, about } = req.body;
  User.updateOne(userId, { name, about })
    .orFail(onOrFail)
    .then((data) => {
      console.log('data del update en el then   ', data)
      res.send({ status: true, data: data });
    })
    .catch(
      next
    );
};

module.exports.updateAvatar = (req, res, next) => {
  const { userId } = req.user._id;
  const { avatar } = req.body;
  User.updateOne(userId , { avatar })
    .orFail(onOrFail)
    .then((data) => {
      console.log('data del update en el then de avatar  ', data)
      res.send({ status: true, data: data });
    })
    .catch(
      next
    );
};
