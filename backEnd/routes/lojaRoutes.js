const express = require("express");
const path = require("path");
const router = express.Router();

// Rota para servir a página de gestão de lojas
router.get("/store", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageEnvio.html"));
});

module.exports = router;
