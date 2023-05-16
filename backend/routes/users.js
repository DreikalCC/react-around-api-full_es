const express = require("express");
const router = express.Router();
const { celebrate, Joi} = require('celebrate');

const {
  getUsers,
  getSpecificUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser
} = require("../controllers/usersController");

router.get("/", getUsers);

router.get("/:id", getSpecificUser);

router.get("/users/me", getCurrentUser);

/*router.post("/", login);

router.post("/", createUser);*/

router.patch("/me", updateProfile);

router.patch("/me/avatar", updateAvatar);

module.exports = router;
