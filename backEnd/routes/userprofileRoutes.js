const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/userProfileController");

// Rotas
router
  .route("/api/association")
  .get(userProfileController.listUserProfiles)
  .post(userProfileController.registerUserProfile);
router
  .route("/api/association/:registration")
  .put(userProfileController.editUserProfile)
  .delete(userProfileController.deleteUserProfile);

module.exports = router;

