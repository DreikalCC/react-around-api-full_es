const bcrypt = require("bcryptjs");
const User = require("../models/user");
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
      /*(err) => {
    if (err.status === 404) {
      res.status(404).send({ message: "no existe tal usuario" });
    } else {
      res.status(500).send({ message: "Error", err, body: req.body });
    }
  }*/
    );
};

/*module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún usuario");
      error.status = 404;
      throw error;
    })
    .then((data) => {
      res.send({ status: true, data: data });
      return bcrypt.compare(password, data.password);
    })
    .then((match) => {
      if (!match) {
        return Promise.reject(new Error("password o email incorrectos"));
      }
      res.send({ message: "¡Bienvenido de vuelta!" });
    })
    .catch((err) => {
      if (err.status === 404) {
        res.status(404).send({ message: "no se encontró tal usuario" });
      } else {
        res.status(500).send({ message: "Error", err, body: req.body });
      }
    });
};*/

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
      /*(err) => {
    res.status(401).send({ message: "Error", err, body: req.body });
  }*/
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
      /*(err) => {
    if (err.status === 404) {
      res.status(404).send({ message: "no existe tal usuario" });
    } else {
      res.status(500).send({ message: "Error", err, body: req.body });
    }
  }*/
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
      /*(err) => {
    if (err.status === 404) {
      res.status(404).send({ message: "no existe tal usuario" });
    } else {
      res.status(500).send({ message: "Error", err, body: req.body });
    }
  }*/
    );
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      res.status(201).send({
        email: user.email,
        _id: user._id,
      });
    })
    .catch(
      next
      /*(err) => {
      res.status(500).send({ message: "Error", err, body: req.body });
    }*/
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
      /*(err) => {
    if (err.status === 404) {
      res.status(404).send({ message: "no existe tal usuario" });
    } else {
      res.status(500).send({ message: "Error", err, body: req.body });
    }
  }*/
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
      /*(err) => {
    if (err.status === 404) {
      res.status(404).send({ message: "no existe tal usuario" });
    } else {
      res.status(500).send({ message: "Error", err, body: req.body });
    }
  }*/
    );
};
