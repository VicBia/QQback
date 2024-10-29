const express = require("express");
const path = require("path");
const router = express.Router();

// Rota para servir a página de dashboard
router.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageDashboard.html"));
});

// Rota para servir a página de gestão de usuários
router.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageAdm.html"));
});

// Rota para servir a página de gestão do perfis
router.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pagePerfis.html"));
});

module.exports = router;
