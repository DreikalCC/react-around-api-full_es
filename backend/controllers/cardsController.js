const Card = require("../models/cardModel");

const NotFoundError = require("../errors/not-found");

function onOrFail() {
  throw new NotFoundError("No se ha encontrado ninguna tarjeta");
}

/*function cardError(req, res, err) {
  if (err.status === 404) {
    res.status(404).send({ message: "no existe tal tarjeta" });
  } else {
    res.status(500).send({ message: "Error", err, body: req.body });
  }
}*/

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .orFail(onOrFail)
    .then((data) => {
      res.send({ status: true, data });
    })
    .catch(
      next
      //(err) => cardError(req, res, err)
    );
};

module.exports.postCard = (req, res, next) => {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  })
    .then((card) => {
      res.send({ data: card });
    })
    .catch(
      next
      //(err) => cardError(req, res, err)
    );
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete({ _id: cardId })
    .orFail(onOrFail)
    .then((data) => {
      res.send({ status: true, data });
    })
    .catch(
      next
      //(err) => cardError(req, res, err)
    );
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(onOrFail)
    .then((data) => {
      res.send({ status: true, data });
    })
    .catch(
      next
      //(err) => cardError(req, res, err)
    );
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(onOrFail)
    .then((data) => {
      res.send({ status: true, data });
    })
    .catch(
      next
      //(err) => cardError(req, res, err)
    );
};
