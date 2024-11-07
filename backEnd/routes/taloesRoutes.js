const express = require("express");
const path = require("path");
const router = express.Router();
const { inserirEstoque } = require("../services/stockService");
const { inserirSolicitacao } = require("../services/maintenceService");

// Rota para servir a página de gestão de lojas
router
  .route("/maintenance")
  .get((req, res) => {
    res.sendFile(path.join(__dirname, "../../frontEnd/pageManutencao.html"));
  })
  .post(async (req, res) => {
    const { id_loja, quantidade_taloes, status } = req.body;

    try {
      const novaSolicitacao = await inserirSolicitacao(
        id_loja,
        quantidade_taloes,
        status
      );
      res.status(201).json({
        message: "Solicitação cadastrado com sucesso!",
        usuario: novaSolicitacao,
      });
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao cadastrar solicitacao", error: erro.message });
    }
  });

// Rota para servir a página de gestão de estoque
router
  .route("/stock")
  .get((req, res) => {
    res.sendFile(path.join(__dirname, "../../frontEnd/pageEstoque.html"));
  })
  .post(async (req, res) => {
    const {
      id_loja,
      quantidade_atual,
      quantidade_recomendada,
      quantidade_min,
    } = req.body;

    try {
      const novaEstoque = await inserirEstoque(
        id_loja,
        quantidade_atual,
        quantidade_recomendada,
        quantidade_min
      );
      res.status(201).json({
        message: "Estoque cadastrado com sucesso!",
        usuario: novaEstoque,
      });
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao cadastrar estoque", error: erro.message });
    }
  });

module.exports = router;
