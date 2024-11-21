const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Rotas
router
  .route("/api/register")
  .get(userController.listUsers)
  .post(userController.registerUser);
router
  .route("/api/register/:registration")
  .put(userController.editUser)
  .delete(userController.deleteUser);

module.exports = router;

