const express = require("express");
const path = require("path");
const router = express.Router();
const {
  inserirEstoque,
  consultarEstoques,
  editarEstoque,
  deletarEstoque,
} = require("../services/stockService");

// Rota para servir a página de gestão de estoque
router
  .route("/api/stock")
  .get(async (req, res) => {
    try {
      // res.sendFile(path.join(__dirname, "../../frontEnd/pageEstoque.html")); // Envia a página HTML
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
      id_store,
      current_quantity,
      recommended_quantity,
      minimum_quantity,
    } = req.body;

    try {
      const novaEstoque = await inserirEstoque(
        id_store,
        current_quantity,
        recommended_quantity,
        minimum_quantity
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
  .route("/api/stock/:id_stock")
  .put(async (req, res) => {
    const { id_stock } = req.params;
    const {
      id_store,
      current_quantity,
      recommended_quantity,
      minimum_quantity,
    } = req.body;

    try {
      const estoqueAtualizado = await editarEstoque(
        id_stock,
        id_store,
        current_quantity,
        recommended_quantity,
        minimum_quantity
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
    const { id_stock } = req.params;

    try {
      const estoqueExcluido = await deletarEstoque(id_stock);
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
