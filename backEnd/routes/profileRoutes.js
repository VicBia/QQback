const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authenticateMiddleware = require("../middlewares/authMiddleware"); // Middleware de autenticação

// Rotas protegidas
router
  .route("/api/profile")
  .get(authenticateMiddleware, profileController.listProfiles) // Protegendo a rota de listagem
  .post(authenticateMiddleware, profileController.registerProfile); // Protegendo a rota de registro

router
  .route("/api/profile/:id_profile")
  .put(authenticateMiddleware, profileController.editProfile) // Protegendo a rota de edição
  .delete(authenticateMiddleware, profileController.deleteProfile); // Protegendo a rota de exclusão

module.exports = router;
