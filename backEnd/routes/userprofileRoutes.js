const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/userProfileController");
const authenticateMiddleware = require("../middlewares/authMiddleware"); // Middleware de autenticação
const acessMiddleware = require("../middlewares/acessMiddleware");

// Rotas
router
  .route("/api/association")
  .get(
    authenticateMiddleware,
    acessMiddleware(["profile"]),
    userProfileController.listUserProfiles
  )
  .post(
    authenticateMiddleware,
    acessMiddleware(["profile"]),
    userProfileController.registerUserProfile
  );
router
  .route("/api/association/:registration")
  .put(
    authenticateMiddleware,
    acessMiddleware(["profile"]),
    userProfileController.editUserProfile
  )
  .delete(
    authenticateMiddleware,
    acessMiddleware(["profile"]),
    userProfileController.deleteUserProfile
  );

module.exports = router;
