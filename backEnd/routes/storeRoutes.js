const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const authenticateToken = require("../middlewares/authMiddleware"); // Middleware de autenticação

// Rotas
router
  .route("/api/store")
  .get(authenticateToken, storeController.listStore)
  .post(authenticateToken, storeController.registerStore);
router
  .route("/api/store/:id_store")
  .put(authenticateToken, storeController.editStore)
  .delete(authenticateToken, storeController.deleteStore);

module.exports = router;
