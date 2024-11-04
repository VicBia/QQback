const express = require("express");
const path = require("path");
const router = express.Router();
const { inserirUsuario } = require("../services/userService");

// Rota para servir a página de login de usuários
router.route("/login").get((req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/login.html"));
});

// Rota para servir a página de cadastro de usuários
router
  .route("/register")
  .get((req, res) => {
    res.sendFile(path.join(__dirname, "../../frontEnd/register.html"));
  })
  .post(async (req, res) => {
    const { name, matricula, email, password, loja } = req.body;

    try {
      const novoUsuario = await inserirUsuario(
        name,
        matricula,
        email,
        password,
        loja
      );
      res
        .status(201)
        .json({
          message: "Usuário cadastrado com sucesso!",
          usuario: novoUsuario,
        });
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao cadastrar usuário", error: erro.message });
    }
  });

// Rota para servir a página de observação do registro
router.get("/register_obs", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/registerObs.html"));
});

// Rota para servir a página de esqueci a senha
router.get("/forgot_password", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/forgotPassword.html"));
});

// Rota para servir a página de recuperar a senha
router.get("/token_password", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/tokenPassword.html"));
});

module.exports = router;
