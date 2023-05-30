const express = require("express");
const router = express.Router();
const { celebrate, Joi } = require("celebrate");
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const {
  getUsers,
  getSpecificUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/usersController");

router.get("/", getUsers);

router.get(
  "/:id",
  getSpecificUser
);

router.get(
  "/users/me",
  getCurrentUser
);

router.patch(
  "/me",
  updateProfile
);

router.patch(
  "/me/avatar",
  updateAvatar
);

module.exports = router;
