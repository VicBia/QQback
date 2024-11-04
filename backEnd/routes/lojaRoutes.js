const express = require("express");
const path = require("path");
const router = express.Router();
const { inserirLoja } = require("../services/storeService");

// Rota para servir a página de gestão de lojas
router
  .route("/store")
  .get((req, res) => {
    res.sendFile(path.join(__dirname, "../../frontEnd/pageLoja.html"));
  })
  .post(async (req, res) => {
    const { codLoja, name } = req.body;

    try {
      const novaLoja = await inserirLoja(codLoja, name);
      res.status(201).json({
        message: "Loja cadastrada com sucesso!",
        usuario: novaLoja,
      });
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao cadastrar loja", error: erro.message });
    }
  });

module.exports = router;
