const express = require("express");
const path = require("path");
const router = express.Router();
const {
  inserirEstoque,
  consultarEstoques,
  editarEstoque,
  deletarEstoque,
} = require("../services/stockService");
const {
  inserirSolicitacao,
  consultarTaloes,
  editarTalao,
  deletarTalao,
} = require("../services/maintenceService");

// Rota para servir a página de gestão de lojas
router
  .route("/maintenance")
  .get(async (req, res) => {
    try {
      res.sendFile(path.join(__dirname, "../../frontEnd/pageManutencao.html")); // Envia a página HTML
      const taloes = await consultarTaloes();
      res.status(200).json(taloes); // Retorna todas as solicitações de talões
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao consultar talões", error: erro.message });
    }
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
      res.status(500).json({
        message: "Erro ao cadastrar solicitacao",
        error: erro.message,
      });
    }
  });

// Rota para editar e deletar um talão pelo ID
router
  .route("/maintenance/:id_talao")
  .put(async (req, res) => {
    const { id_talao } = req.params;
    const { quantidade_taloes, remessa, status, id_loja } = req.body;

    try {
      const talaoAtualizado = await editarTalao(
        id_talao,
        quantidade_taloes,
        remessa,
        status,
        id_loja
      );
      if (talaoAtualizado) {
        res.status(200).json({
          message: "Talão atualizado com sucesso!",
          talao: talaoAtualizado,
        });
      } else {
        res.status(404).json({ message: "Talão não encontrado." });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao editar talão", error: erro.message });
    }
  })
  .delete(async (req, res) => {
    const { id_talao } = req.params;

    try {
      const talaoExcluido = await deletarTalao(id_talao);
      if (talaoExcluido) {
        res.status(200).json({
          message: "Talão excluído com sucesso!",
          talao: talaoExcluido,
        });
      } else {
        res.status(404).json({ message: "Talão não encontrado." });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao excluir talão", error: erro.message });
    }
  });

// Rota para servir a página de gestão de estoque
router
  .route("/stock")
  .get(async (req, res) => {
    try {
      res.sendFile(path.join(__dirname, "../../frontEnd/pageEstoque.html")); // Envia a página HTML
      const estoques = await consultarEstoques();
      res.status(200).json(estoques); // Retorna todos os estoques
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao consultar estoques", error: erro.message });
    }
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

// Rota para editar e deletar um estoque pelo ID
router
  .route("/stock/:id_estoque")
  .put(async (req, res) => {
    const { id_estoque } = req.params;
    const {
      id_loja,
      quantidade_atual,
      quantidade_recomendada,
      quantidade_min,
    } = req.body;

    try {
      const estoqueAtualizado = await editarEstoque(
        id_estoque,
        id_loja,
        quantidade_atual,
        quantidade_recomendada,
        quantidade_min
      );
      if (estoqueAtualizado) {
        res.status(200).json({
          message: "Estoque atualizado com sucesso!",
          estoque: estoqueAtualizado,
        });
      } else {
        res.status(404).json({ message: "Estoque não encontrado." });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao editar estoque", error: erro.message });
    }
  })
  .delete(async (req, res) => {
    const { id_estoque } = req.params;

    try {
      const estoqueExcluido = await deletarEstoque(id_estoque);
      if (estoqueExcluido) {
        res.status(200).json({
          message: "Estoque excluído com sucesso!",
          estoque: estoqueExcluido,
        });
      } else {
        res.status(404).json({ message: "Estoque não encontrado." });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao excluir estoque", error: erro.message });
    }
  });

module.exports = router;
