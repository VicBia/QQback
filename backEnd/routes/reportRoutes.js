const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const authenticateMiddleware = require("../middlewares/authMiddleware");
const acessMiddleware = require("../middlewares/acessMiddleware");

// Rota para exportação de usuários
router
  .route("/api/reports")
  .post(
    authenticateMiddleware,
    acessMiddleware(["reports"]), // Checa se o usuário tem permissão de relatório
    reportController.exportUsers // Chama o controlador de exportação
  );

module.exports = router;
