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
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

router.get("/", getCards);

router.post("/", celebrate({
  body: Joi.object().keys({
    title:Joi.string().required().min(2).max(30),
    link:Joi.string().required().custom(validateURL),
  })
  .unknown(true),
}), postCard);

router.delete("/:cardId", celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({}),
  query: Joi.object().keys({}),
}), deleteCard);

router.put("/:cardId/likes", celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({}),
  query: Joi.object().keys({}),
}), likeCard);

router.delete("/:cardId/likes", celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum(),
  }),
  headers: Joi.object().keys({}),
  query: Joi.object().keys({}),
}), dislikeCard);

module.exports = router;
