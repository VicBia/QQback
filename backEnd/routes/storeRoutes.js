const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const authenticateMiddleware = require("../middlewares/authMiddleware"); // Middleware de autenticação

// Rotas
router
  .route("/api/store")
  .get(authenticateMiddleware, storeController.listStore)
  .post(authenticateMiddleware, storeController.registerStore);
router
  .route("/api/store/:id_store")
  .put(authenticateMiddleware, storeController.editStore)
  .delete(authenticateMiddleware, storeController.deleteStore);

module.exports = router;
