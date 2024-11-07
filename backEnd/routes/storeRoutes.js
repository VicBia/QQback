const express = require("express");
const path = require("path");
const router = express.Router();
const {
  inserirLoja,
  consultarLojas,
  editarLoja,
  deletarLoja,
} = require("../services/storeService");

// Rota para servir a página de gestão de lojas e consultar todas as lojas
router
  .route("/store")
  .get(async (req, res) => {
    try {
      res.sendFile(path.join(__dirname, "../../frontEnd/pageLoja.html")); // Envia a página HTML
      const lojas = await consultarLojas();
      res.status(200).json(lojas); // Retorna todas as lojas
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao consultar lojas", error: erro.message });
    }
  })
  .post(async (req, res) => {
    const { numero_loja, nome_loja } = req.body;

    try {
      const novaLoja = await inserirLoja(numero_loja, nome_loja);
      res.status(201).json({
        message: "Loja cadastrada com sucesso!",
        loja: novaLoja,
      });
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao cadastrar loja", error: erro.message });
    }
  });

// Rota para editar e deletar uma loja pelo ID
router
  .route("/store/:id_loja")
  .put(async (req, res) => {
    const { id_loja } = req.params;
    const { numero_loja, nome_loja } = req.body;

    try {
      const lojaAtualizada = await editarLoja(id_loja, numero_loja, nome_loja);
      if (lojaAtualizada) {
        res.status(200).json({
          message: "Loja atualizada com sucesso!",
          loja: lojaAtualizada,
        });
      } else {
        res.status(404).json({ message: "Loja não encontrada." });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao editar loja", error: erro.message });
    }
  })
  .delete(async (req, res) => {
    const { id_loja } = req.params;

    try {
      const lojaExcluida = await deletarLoja(id_loja);
      if (lojaExcluida) {
        res.status(200).json({
          message: "Loja excluída com sucesso!",
          loja: lojaExcluida,
        });
      } else {
        res.status(404).json({ message: "Loja não encontrada." });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao excluir loja", error: erro.message });
    }
  });

module.exports = router;
