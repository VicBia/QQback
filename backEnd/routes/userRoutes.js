const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateMiddleware = require("../middlewares/authMiddleware"); // Middleware de autenticação

// Rotas
router
  .route("/api/register")
  .get(authenticateMiddleware, userController.listUsers)
  .post(authenticateMiddleware, userController.registerUser);
router
  .route("/api/register/:registration")
  .put(authenticateMiddleware, userController.editUser)
  .delete(authenticateMiddleware, userController.deleteUser);

module.exports = router;
