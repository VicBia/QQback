const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

// Rotas
router
  .route("/api/profile")
  .get(profileController.listProfiles)
  .post(profileController.registerProfile);
router
  .route("/api/profile/:id_profile")
  .put(profileController.editProfile)
  .delete(profileController.deleteProfile);

module.exports = router;
