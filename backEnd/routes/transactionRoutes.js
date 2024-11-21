const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

// Rotas
router
  .route("/api/send")
  .get(transactionController.listTransactions)
  .post(transactionController.registerTransaction);
router
  .route("/api/send/:id_transaction")
  .put(transactionController.editTransaction)
  .delete(transactionController.deleteTransaction);

module.exports = router;
