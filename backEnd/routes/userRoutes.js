const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middlewares/authMiddleware"); // Middleware de autenticação

// Rotas
router
  .route("/api/register")
  .get(authenticateToken, userController.listUsers)
  .post(authenticateToken, userController.registerUser);
router
  .route("/api/register/:registration")
  .put(authenticateToken, userController.editUser)
  .delete(authenticateToken, userController.deleteUser);

module.exports = router;
