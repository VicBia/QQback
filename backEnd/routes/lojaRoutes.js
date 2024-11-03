const express = require("express");
const path = require("path");
const router = express.Router();

// Rota para servir a página de gestão de lojas
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageLojas.html"));
});

module.exports = router;
