const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");
const authenticateToken = require("../middlewares/authMiddleware"); // Middleware de autenticação

// Rotas
router
  .route("/api/stock")
  .get(authenticateToken, stockController.listStocks)
  .post(authenticateToken, stockController.registerStock);
router
  .route("/api/stock/:id_stock")
  .put(authenticateToken, stockController.editStock)
  .delete(authenticateToken, stockController.deleteStock);

module.exports = router;
