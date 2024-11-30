const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authenticateMiddleware = require("../middlewares/authMiddleware"); // Middleware de autenticação
const acessMiddleware = require("../middlewares/acessMiddleware");

// Rotas protegidas
router
  .route("/api/profile")
  .get(
    authenticateMiddleware,
    acessMiddleware(["profile"]),
    profileController.listProfiles
  ) // Protegendo a rota de listagem
  .post(
    authenticateMiddleware,
    acessMiddleware(["profile"]),
    profileController.registerProfile
  ); // Protegendo a rota de registro

router
  .route("/api/profile/:id_profile")
  .put(
    authenticateMiddleware,
    acessMiddleware(["profile"]),
    profileController.editProfile
  ) // Protegendo a rota de edição
  .delete(
    authenticateMiddleware,
    acessMiddleware(["profile"]),
    profileController.deleteProfile
  ); // Protegendo a rota de exclusão

module.exports = router;
