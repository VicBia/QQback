const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const authenticateToken = require("../middlewares/authMiddleware"); // Middleware de autenticação

// Rotas
router
  .route("/api/send")
  .get(authenticateToken, transactionController.listTransactions)
  .post(authenticateToken, transactionController.registerTransaction);
router
  .route("/api/send/:id_transaction")
  .put(authenticateToken, transactionController.editTransaction)
  .delete(authenticateToken, transactionController.deleteTransaction);

module.exports = router;
