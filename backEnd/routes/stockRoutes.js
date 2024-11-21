const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");

// Rotas
router
  .route("/api/stock")
  .get(stockController.listStocks)
  .post(stockController.registerStock);
router
  .route("/api/stock/:id_stock")
  .put(stockController.editStock)
  .delete(stockController.deleteStock);

module.exports = router;
