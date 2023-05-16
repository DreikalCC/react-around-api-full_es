const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cardsController");
const { celebrate, Joi} = require('celebrate');

router.get("/", getCards);

router.post("/", celebrate({
  body: Joi.object().keys({
    title:Joi.string().required().min(2).max(30),
    link:Joi.string().required().min(7)
  })
}), postCard);

router.delete("/:cardId", celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum()
  })
}), deleteCard);

router.put("/:cardId/likes", likeCard);

router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
