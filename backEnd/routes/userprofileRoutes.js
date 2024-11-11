const express = require("express");
const path = require("path");
const router = express.Router();
const {
  consultarAssociacao,
  inserirAssociacao,
  editarAssociacao,
  deletarAssociacao,
} = require("../services/userprofileService");

// Rota para servir a página de cadastro de usuários
router
  .route("/api/association")
  .get(async (req, res) => {
    try {
      // res.sendFile(path.join(__dirname, "../../frontEnd/register.html"));
      const usuarios = await consultarAssociacao();
      res.status(200).json(usuarios); // Retorna todos os usuários
    } catch (erro) {
      res.status(500).json({
        message: "Erro ao consultar associações",
        error: erro.message,
      });
    }
  })
  .post(async (req, res) => {
    const { registration, id_profile } = req.body;

    try {
      const novoUsuario = await inserirAssociacao(registration, id_profile);
      res.status(201).json({
        message: "Associação cadastrado com sucesso!",
        usuario: novoUsuario,
      });
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao cadastrar associação", error: erro.message });
    }
  });

router
  .route("/api/association/:registration")
  .put(async (req, res) => {
    const { registration } = req.params;
    const { id_profile } = req.body;

    try {
      const usuarioAtualizado = await editarAssociacao(
        registration,
        id_profile
      );
      if (usuarioAtualizado) {
        res.status(200).json({
          message: "Associação atualizado com sucesso!",
          usuario: usuarioAtualizado,
        });
      } else {
        res.status(404).json({ message: "Associação não encontrado." });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao editar associação", error: erro.message });
    }
  })
  .delete(async (req, res) => {
    const { registration, id_profile } = req.params;

    try {
      const usuarioExcluido = await deletarAssociacao(registration, id_profile);
      if (usuarioExcluido) {
        res.status(200).json({
          message: "Associação excluída com sucesso!",
          usuario: usuarioExcluido,
        });
      } else {
        res.status(404).json({ message: "Associação não encontrada." });
      }
    } catch (erro) {
      res.status(500).json({
        message: "Erro ao excluir associação",
        error: erro.message,
      });
    }
  });

module.exports = router;
