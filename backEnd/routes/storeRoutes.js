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
  .route("/api/store")
  .get(async (req, res) => {
    try {
      // res.sendFile(path.join(__dirname, "../../frontEnd/pageLoja.html")); // Envia a página HTML
      const lojas = await consultarLojas();
      res.status(200).json(lojas); // Retorna todas as lojas
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao consultar lojas", error: erro.message });
    }
  })
  .post(async (req, res) => {
    const { store_number, store_name } = req.body;

    try {
      const novaLoja = await inserirLoja(store_number, store_name);
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
  .route("/api/store/:id_store")
  .put(async (req, res) => {
    const { id_store } = req.params;
    const { store_number, store_name } = req.body;

    try {
      const lojaAtualizada = await editarLoja(
        id_store,
        store_number,
        store_name
      );
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
    const { id_store } = req.params;

    try {
      const lojaExcluida = await deletarLoja(id_store);
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
