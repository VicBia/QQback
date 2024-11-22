const express = require("express");
const path = require("path");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");

// Rota para servir a página de login de usuários
router.route("/login").get((req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/login.html"));
});

// Rota para servir a página de cadastro de usuários
router.get("/registro", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/register.html"));
});

// Rota para servir a página de observação do registro
router.get("/registro_obs", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/registerObs.html"));
});

// Rota para servir a página de esqueci a senha
router.get("/esqueci_a_senha", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/forgotPassword.html"));
});

// Rota para servir a página de recuperar a senha
router.get("/token_senha", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/tokenPassword.html"));
});

// Rota para servir a página de gestão de usuários
router.get("/gestao_usuarios", authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageAdm.html"));
});

// Rota para servir a página de gestão do perfis
router.get("/gestao_perfis", authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pagePerfis.html"));
});

// Rota para servir a página de gestão de lojas
router.get("/gestao_lojas", authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageLoja.html"));
});

// Rota para servir a página de manutenção
router.get("/manutencao", authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pagemanutencao.html"));
});

// Rota para servir a página de estoque
router.get("/estoque", authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageestoque.html"));
});

// Rota para servir a página de envio
router.get("/gestao_envio", authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageEnvio.html"));
});

// Rota para servir a página de recebimento
router.get("/gestao_recebimento", authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageRecebimento.html"));
});

// Rota para servir a página de gestão de relatorios
router.get("/relatorios", authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageRelatorios.html"));
});

// Rota para servir a página de dashboard
router.get("/dashboard", authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageDashboard.html"));
});

module.exports = router;
