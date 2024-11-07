const express = require("express");
const path = require("path");
const router = express.Router();
const { inserirEnvio } = require("../services/transacaoEnvioService");

// Rota para servir a página de envio de talões
router
  .route("/send")
  .get((req, res) => {
    res.sendFile(path.join(__dirname, "../../frontEnd/pageEnvio.html"));
  })
  .post(async (req, res) => {
    const { tempo_previsto, envio_transacao, id_talao } = req.body;

    try {
      const novaSolicitacao = await inserirEnvio(
        tempo_previsto,
        envio_transacao,
        id_talao
      );
      res.status(201).json({
        message: "Envio cadastrado com sucesso!",
        resultado: novaSolicitacao,
      });
    } catch (erro) {
      res.status(500).json({
        message: "Erro ao cadastrar envio",
        error: erro.message,
      });
    }
  });

// Rota para servir a página de gestão de recebimento de talões
router.get("/receive", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontEnd/pageRecebimento.html"));
});

module.exports = router;
