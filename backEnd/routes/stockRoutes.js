const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");
const authenticateMiddleware = require("../middlewares/authMiddleware"); // Middleware de autenticação
const acessMiddleware = require("../middlewares/acessMiddleware");

// Rotas
router
  .route("/api/stock")
  .get(
    authenticateMiddleware,
    acessMiddleware(["stock"]),
    stockController.listStocks
  )
  .post(
    authenticateMiddleware,
    acessMiddleware(["stock"]),
    stockController.registerStock
  );
router
  .route("/api/stock/:id_stock")
  .put(
    authenticateMiddleware,
    acessMiddleware(["stock"]),
    stockController.editStock
  )
  .delete(
    authenticateMiddleware,
    acessMiddleware(["stock"]),
    stockController.deleteStock
  );

module.exports = router;
