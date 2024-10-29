const express = require("express");
const path = require("path");
const router = express.Router();

// Rota para servir a página de envio de talões
router.get("/send", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageEnvio.html"));
});

// Rota para servir a página de gestão de recebimento de talões
router.get("/receive", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageRecebimento.html"));
});


module.exports = router;
