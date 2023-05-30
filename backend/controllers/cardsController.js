const Card = require("../models/cardModel");

const NotFoundError = require("../errors/not-found");

function onOrFail() {
  throw new NotFoundError("No se ha encontrado ninguna tarjeta");
}

function cardError(req,res,err){
  if (err.status === 404) {
    res.status(404).send({ message: "no existe tal tarjeta" });
  } else {
    res.status(500).send({ message: "Error", err, body: req.body });
  }
}

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(onOrFail)
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch((err) => cardError(req,res,err));
};

module.exports.postCard = (req, res) => {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => cardError(req,res,err));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete({ _id: cardId })
    .orFail(onOrFail)
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch((err) =>cardError(req,res,err));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(onOrFail)
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch((err) => cardError(req,res,err));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(onOrFail)
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch((err) => cardError(req,res,err));
};
