const express = require("express");
const path = require("path");
const router = express.Router();

// Rota para servir a página de login de usuários
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/login.html"));
});

// Rota para servir a página de cadastro de usuários
router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/register.html"));
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
