const express = require("express");
const path = require("path");
const router = express.Router();
const authenticateMiddleware = require("../middlewares/authMiddleware");
const authController = require("../controllers/authController");
const acessMiddleware = require("../middlewares/acessMiddleware");

// Rota para servir a página de login de usuários
router.get("/login", (req, res) => {
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
router.get(
  "/gestao_usuarios",
  authenticateMiddleware,
  acessMiddleware(["users"]),
  (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontEnd/pageAdm.html"));
  }
);

// Rota para servir a página de gestão do perfis
router.get(
  "/gestao_perfis",
  authenticateMiddleware,
  acessMiddleware(["profile"]),
  (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontEnd/pagePerfis.html"));
  }
);

// Rota para servir a página de gestão de lojas
router.get(
  "/gestao_lojas",
  authenticateMiddleware,
  acessMiddleware(["store"]),
  (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontEnd/pageLoja.html"));
  }
);

// Rota para servir a página de manutenção
router.get(
  "/manutencao",
  authenticateMiddleware,
  acessMiddleware(["maintenance"]),
  (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontEnd/pagemanutencao.html"));
  }
);

// Rota para servir a página de estoque
router.get(
  "/estoque",
  authenticateMiddleware,
  acessMiddleware(["stock"]),
  (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontEnd/pageestoque.html"));
  }
);

// Rota para servir a página de envio
router.get(
  "/gestao_envio",
  authenticateMiddleware,
  acessMiddleware(["send"]),
  (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontEnd/pageEnvio.html"));
  }
);

// Rota para servir a página de recebimento
router.get(
  "/gestao_recebimento",
  authenticateMiddleware,
  acessMiddleware(["receive"]),
  (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontEnd/pageRecebimento.html"));
  }
);

// Rota para servir a página de gestão de relatorios
router.get(
  "/relatorios",
  authenticateMiddleware,
  acessMiddleware(["reports"]),
  (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontEnd/pageRelatorios.html"));
  }
);

// Rota para servir a página de dashboard
router.get(
  "/dashboard",
  authenticateMiddleware,
  acessMiddleware(["dashboard"]),
  (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontEnd/pageDashboard.html"));
  }
);

module.exports = router;
