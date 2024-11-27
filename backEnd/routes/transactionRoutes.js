const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const authenticateMiddleware = require("../middlewares/authMiddleware"); // Middleware de autenticação

// Rotas
router
  .route("/api/send")
  .get(authenticateMiddleware, transactionController.listTransactions)
  .post(authenticateMiddleware, transactionController.registerTransaction);
router
  .route("/api/send/:id_transaction")
  .put(authenticateMiddleware, transactionController.editTransaction)
  .delete(authenticateMiddleware, transactionController.deleteTransaction);

module.exports = router;
