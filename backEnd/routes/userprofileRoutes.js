const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/userProfileController");
const authenticateToken = require("../middlewares/authMiddleware"); // Middleware de autenticação

// Rotas
router
  .route("/api/association")
  .get(authenticateToken, userProfileController.listUserProfiles)
  .post(authenticateToken, userProfileController.registerUserProfile);
router
  .route("/api/association/:registration")
  .put(authenticateToken, userProfileController.editUserProfile)
  .delete(authenticateToken, userProfileController.deleteUserProfile);

module.exports = router;
