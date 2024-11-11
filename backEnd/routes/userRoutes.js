const express = require("express");
const path = require("path");
const router = express.Router();
const {
  consultarUsuarios,
  inserirUsuario,
  editarUsuario,
  deletarUsuario,
} = require("../services/userService");

// Rota para servir a página de login de usuários
router.route("/login").get((req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/login.html"));
});

// Rota para servir a página de cadastro de usuários
router
  .route("/api/register")
  .get(async (req, res) => {
    try {
      // res.sendFile(path.join(__dirname, "../../frontEnd/register.html"));
      const usuarios = await consultarUsuarios();
      res.status(200).json(usuarios); // Retorna todos os usuários
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao consultar usuários", error: erro.message });
    }
  })
  .post(async (req, res) => {
    const {
      registration,
      user_name,
      email,
      user_password,
      id_store,
    } = req.body;

    try {
      const novoUsuario = await inserirUsuario(
        registration,
        user_name,
        email,
        user_password,
        id_store
      );
      res.status(201).json({
        message: "Usuário cadastrado com sucesso!",
        usuario: novoUsuario,
      });
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao cadastrar usuário", error: erro.message });
    }
  });

router
  .route("/api/register/:registration")
  .put(async (req, res) => {
    const { registration } = req.params;
    const { user_name, email, password, id_store, registration_date } =
      req.body;

    try {
      const usuarioAtualizado = await editarUsuario(
        registration,
        user_name,
        email,
        password,
        id_store
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
    const { registration } = req.params;

    try {
      const usuarioExcluido = await deletarUsuario(registration);
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

// Rota para servir a página de observação do registro
router.get("/register_obs", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/registerObs.html"));
});

// Rota para servir a página de esqueci a password
router.get("/forgot_password", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/forgotPassword.html"));
});

// Rota para servir a página de recuperar a password
router.get("/token_password", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/tokenPassword.html"));
});

// Rota para servir a página de gestão de usuários
router.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageAdm.html"));
});

module.exports = router;
