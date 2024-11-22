const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authenticateToken = require("../middlewares/authMiddleware"); // Middleware de autenticação

// Rotas protegidas
router
  .route("/api/profile")
  .get(authenticateToken, profileController.listProfiles) // Protegendo a rota de listagem
  .post(authenticateToken, profileController.registerProfile); // Protegendo a rota de registro

router
  .route("/api/profile/:id_profile")
  .put(authenticateToken, profileController.editProfile) // Protegendo a rota de edição
  .delete(authenticateToken, profileController.deleteProfile); // Protegendo a rota de exclusão

module.exports = router;
