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
  /*celebrate({
    params: Joi.object().keys({
      _Id: Joi.string().alphanum(),
    }),
    headers: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().min(6),
    }),*/
    //query: Joi.object().keys({}),
  //}),
  getSpecificUser
);

router.get(
  "/users/me",
  /*celebrate({
    params: Joi.object().keys({
      _Id: Joi.string().alphanum(),
    }),
    headers: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().min(8),
    }),
    //query: Joi.object().keys({}),
  }),*/
  getCurrentUser
);

router.patch(
  "/me",
  celebrate({
    body: Joi.object()
      .keys({
        title: Joi.string().required().min(2).max(30),
        about: Joi.string().required().min(2).max(30),
      })
      .unknown(true),
  }),
  updateProfile
);

router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object()
      .keys({
        link: Joi.string().required().custom(validateURL),
      })
      .unknown(true),
  }),
  updateAvatar
);

module.exports = router;
