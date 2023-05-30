const express = require("express");
const router = express.Router();
const {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cardsController");

router.get("/", getCards);

router.post("/", postCard);

router.delete("/:cardId", deleteCard);

router.put("/:cardId/likes", likeCard);

router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
