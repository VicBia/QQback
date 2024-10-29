const express = require("express");
const path = require("path");
const router = express.Router();

// Rota para servir a página de gestão de lojas
router.get("/maintenance", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageManutencao.html"));
});

// Rota para servir a página de gestão de estoque
router.get("/stock", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageEstoque.html"));
});

module.exports = router;
