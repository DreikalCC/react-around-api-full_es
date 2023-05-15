const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta");
      error.statusCode = 404;
      throw error;
    })
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch((err) => {
      if (err.status === 404) {
        res.status(404).send({ message: "no existe tal tarjeta" });
      } else {
        res.status(500).send({ message: "Error", err, body: req.body });
      }
    });
};

module.exports.postCard = (req, res) => {
  Card.create({ 
    name:req.body, 
    link:req.body, 
    owner:req.user._id
   })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error", err, body: req.body });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params.id;
  Card.findByIdAndDelete({ _id: cardId })
    .orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch((err) => {
      if (err.status === 404) {
        res.status(404).send({ message: "no existe tal tarjeta" });
      } else {
        res.status(500).send({ message: "Error", err, body: req.body });
      }
    });
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch((err) => {
      if (err.status === 404) {
        res.status(404).send({ message: "no existe tal tarjeta" });
      } else {
        res.status(500).send({ message: "Error", err, body: req.body });
      }
    });

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch((err) => {
      if (err.status === 404) {
        res.status(404).send({ message: "no existe tal tarjeta" });
      } else {
        res.status(500).send({ message: "Error", err, body: req.body });
      }
    });
