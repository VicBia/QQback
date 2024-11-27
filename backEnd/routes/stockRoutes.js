const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");
const authenticateMiddleware = require("../middlewares/authMiddleware"); // Middleware de autenticação

// Rotas
router
  .route("/api/stock")
  .get(authenticateMiddleware, stockController.listStocks)
  .post(authenticateMiddleware, stockController.registerStock);
router
  .route("/api/stock/:id_stock")
  .put(authenticateMiddleware, stockController.editStock)
  .delete(authenticateMiddleware, stockController.deleteStock);

module.exports = router;
