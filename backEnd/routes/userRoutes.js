const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateMiddleware = require("../middlewares/authMiddleware"); // Middleware de autenticação
const acessMiddleware = require("../middlewares/acessMiddleware");

// Rotas
router
  .route("/api/register")
  .get(
    authenticateMiddleware,
    acessMiddleware(["users"]),
    userController.listUsers
  )
  .post(
    authenticateMiddleware,
    acessMiddleware(["users"]),
    userController.registerUser
  );
router
  .route("/api/register/:registration")
  .put(
    authenticateMiddleware,
    acessMiddleware(["users"]),
    userController.editUser
  )
  .delete(
    authenticateMiddleware,
    acessMiddleware(["users"]),
    userController.deleteUser
  );

module.exports = router;
