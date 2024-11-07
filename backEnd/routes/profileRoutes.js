const express = require("express");
const path = require("path");
const router = express.Router();
const {
  inserirPerfil,
  consultarPerfis,
  editarPerfil,
  deletarPerfil,
} = require("../services/perfilService");

// Rota para servir a página de gestão do perfis
router
  .route("/profile")
  .get((req, res) => {
    res.sendFile(path.join(__dirname, "../../frontEnd/pagePerfis.html"));
  })
  .post(async (req, res) => {
    const { nome_perfil, descricao } = req.body;

    try {
      const novoPerfil = await inserirPerfil(nome_perfil, descricao);
      res.status(201).json({
        message: "Perfil cadastrado com sucesso!",
        usuario: novoPerfil,
      });
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao cadastrar perfil", error: erro.message });
    }
  });

router
  .route("/profile/:id_perfil")
  .put(async (req, res) => {
    const { id_perfil } = req.params;
    const { nome_perfil, descricao } = req.body;

    try {
      const usuarioAtualizado = await editarPerfil(
        id_perfil,
        nome_perfil,
        descricao
      );
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
    const { id_perfil } = req.params;

    try {
      const usuarioExcluido = await deletarPerfil(id_perfil);
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
