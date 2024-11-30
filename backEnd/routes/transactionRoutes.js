const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const authenticateMiddleware = require("../middlewares/authMiddleware"); // Middleware de autenticação
const acessMiddleware = require("../middlewares/acessMiddleware");

// Rotas
router
  .route("/api/send")
  .get(
    authenticateMiddleware,
    acessMiddleware(["send", "receive", "maintenance"]),
    transactionController.listTransactions
  )
  .post(
    authenticateMiddleware,
    acessMiddleware(["send"]),
    transactionController.registerTransaction
  );
router
  .route("/api/send/:id_transaction")
  .put(
    authenticateMiddleware,
    acessMiddleware(["send", "receive", "maintenance"]),
    transactionController.editTransaction
  )
  .delete(
    authenticateMiddleware,
    acessMiddleware(["send"]),
    transactionController.deleteTransaction
  );

module.exports = router;
