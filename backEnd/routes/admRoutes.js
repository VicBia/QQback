const express = require("express");
const path = require("path");
const router = express.Router();
const { inserirPerfil } = require("../services/admService");


// Rota para servir a página de dashboard
router.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageDashboard.html"));
});

// Rota para servir a página de gestão de usuários
router.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageAdm.html"));
});

// Rota para servir a página de gestão do perfis
router
  .route("/profile")
  .get((req, res) => {
    res.sendFile(path.join(__dirname, "../../frontEnd/pagePerfis.html"));
  })
  .post(async (req, res) => {
    const { nome_perfil, descricao } = req.body;

    try {
      const novoPerfil = await inserirPerfil(
        nome_perfil,
        descricao,
      );
      res
        .status(201)
        .json({
          message: "Perfil cadastrado com sucesso!",
          usuario: novoPerfil,
        });
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao cadastrar perfil", error: erro.message });
    }
  });
module.exports = router;
