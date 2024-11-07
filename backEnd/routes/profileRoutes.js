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
  .get(async (req, res) => {
    try {
      res.sendFile(path.join(__dirname, "../../frontEnd/pagePerfis.html"));
      const perfis = await consultarPerfis();
      res.status(200).json(perfis); // Retorna todos os perfis
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao consultar perfis", error: erro.message });
    }
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
      const perfilAtualizado = await editarPerfil(
        id_perfil,
        nome_perfil,
        descricao
      );
      if (perfilAtualizado) {
        res.status(200).json({
          message: "Perfil atualizado com sucesso!",
          usuario: perfilAtualizado,
        });
      } else {
        res.status(404).json({ message: "Perfil não encontrado." });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao editar perfil", error: erro.message });
    }
  })
  .delete(async (req, res) => {
    const { id_perfil } = req.params;

    try {
      const PerfilExcluido = await deletarPerfil(id_perfil);
      if (PerfilExcluido) {
        res.status(200).json({
          message: "Perfil excluído com sucesso!",
          usuario: PerfilExcluido,
        });
      } else {
        res.status(404).json({ message: "Perfil não encontrado." });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao excluir perfil", error: erro.message });
    }
  });

module.exports = router;
