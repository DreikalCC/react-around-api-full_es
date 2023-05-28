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
  //console.log('cardcontrol getcards ', req);
  Card.find({})
    .orFail(onOrFail)
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch((err) => cardError(req,res,err));
};

module.exports.postCard = (req, res) => {
  console.log('cardcontrol post ', req.user, req.body);
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
  console.log('cardcontrol delete   ', req.params);
  const { cardId } = req.params;
  Card.findByIdAndDelete({ _id: cardId })
    .orFail(onOrFail)
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch((err) =>cardError(req,res,err));
};

module.exports.likeCard = (req, res) => {
  console.log('cardcontrol like params', req.params);
  console.log('cardcontrol like user', req.user);
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
  console.log('cardcontrol dislike params', req.params);
  console.log('cardcontrol dislike user', req.user);
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
