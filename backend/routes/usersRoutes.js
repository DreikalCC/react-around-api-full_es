const express = require("express");
const router = express.Router();

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
