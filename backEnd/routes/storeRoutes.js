const express = require("express");
const path = require("path");
const router = express.Router();
const {
  inserirLoja,
  consultarLojas,
  editarLoja,
  deletarLoja,
} = require("../services/storeService");

// Rota para servir a página de gestão de lojas
router
  .route("/store")
  .get((req, res) => {
    res.sendFile(path.join(__dirname, "../../frontEnd/pageLoja.html"));
  })
  .post(async (req, res) => {
    const { numero_loja, name } = req.body;

    try {
      const novaLoja = await inserirLoja(numero_loja, name);
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

router
  .route("/store/:id_loja")
  .put(async (req, res) => {
    const { id_loja } = req.params;
    const { numero_loja, nome_loja } = req.body;

    try {
      const usuarioAtualizado = await editarLoja(id_loja, numero_loja, nome_loja);
      if (usuarioAtualizado) {
        res.status(200).json({
          message: "Usuário atualizado com sucesso!",
          usuario: usuarioAtualizado,
        });
      } else {
        res.status(404).json({ message: "Usuário não encontrado." });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao editar usuário", error: erro.message });
    }
  })
  .delete(async (req, res) => {
    const { id_loja } = req.params;

    try {
      const usuarioExcluido = await deletarLoja(id_loja);
      if (usuarioExcluido) {
        res.status(200).json({
          message: "Usuário excluído com sucesso!",
          usuario: usuarioExcluido,
        });
      } else {
        res.status(404).json({ message: "Usuário não encontrado." });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao excluir usuário", error: erro.message });
    }
  });

module.exports = router;
