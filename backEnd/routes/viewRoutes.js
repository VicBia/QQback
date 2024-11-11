const express = require("express");
const path = require("path");
const router = express.Router();

// Rota para servir a página de gestão de lojas
router.get("/reports", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageRelatorios.html"));
});

// Rota para servir a página de dashboard
router.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageDashboard.html"));
});

module.exports = router;
