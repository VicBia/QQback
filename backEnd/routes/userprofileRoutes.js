const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/userProfileController");
const authenticateMiddleware = require("../middlewares/authMiddleware"); // Middleware de autenticação

// Rotas
router
  .route("/api/association")
  .get(authenticateMiddleware, userProfileController.listUserProfiles)
  .post(authenticateMiddleware, userProfileController.registerUserProfile);
router
  .route("/api/association/:registration")
  .put(authenticateMiddleware, userProfileController.editUserProfile)
  .delete(authenticateMiddleware, userProfileController.deleteUserProfile);

module.exports = router;
