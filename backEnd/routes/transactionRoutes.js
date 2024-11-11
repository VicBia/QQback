const express = require("express");
const path = require("path");
const router = express.Router();
const {
  consultarEnvio,
  inserirEnvio,
  atualizarTalao,
} = require("../services/transactionService");

// Rota para servir a página de envio de talões
router
  .route("/api/send")
  .get(async (req, res) => {
    try {
      // res.sendFile(path.join(__dirname, "../../frontEnd/pageEnvio.html"));
      const taloes = await consultarEnvio();
      res.status(200).json(taloes); // Retorna todas as solicitações de talões
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao consultar talões", error: erro.message });
    }
  })
  .post(async (req, res) => {
    const {
      shipment,
      id_talon,
      status,
      shipment_transaction,
      expected_time,
      receipt_transaction,
      received_by_registration,
    } = req.body;

    try {
      // Inserir o envio na tabela de transações
      const novaSolicitacao = await inserirEnvio(
        shipment,
        id_talon,
        status,
        shipment_transaction,
        expected_time,
        receipt_transaction,
        received_by_registration
      );

      res.status(201).json({
        message: "Envio cadastrado e talão atualizado com sucesso!",
        envio: novaSolicitacao,
        talao: talaoAtualizado,
      });
    } catch (erro) {
      res.status(500).json({
        message: "Erro ao cadastrar envio ou atualizar talão",
        error: erro.message,
      });
    }
  });

// Rota para editar e deletar um envio pelo ID
router
  .route("/api/send/:id_transaction")
  .put(async (req, res) => {
    const { id_transaction } = req.params;
    const {
      shipment,
      id_talon,
      status,
      shipment_transaction,
      expected_time,
      receipt_transaction,
      received_by_registration,
    } = req.body;

    try {
      const talaoAtualizado = await atualizarTalao(
        id_transaction,
        shipment,
        id_talon,
        status,
        shipment_transaction,
        expected_time,
        receipt_transaction,
        received_by_registration
      );
      if (talaoAtualizado) {
        res.status(200).json({
          message: "Talão atualizado com sucesso!",
          talao: talaoAtualizado,
        });
      } else {
        res.status(404).json({ message: "Talão não encontrado." });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao editar talão", error: erro.message });
    }
  })
  .delete(async (req, res) => {
    const { id_transaction } = req.params;

    try {
      const talaoExcluido = await deletarTalao(id_transaction);
      if (talaoExcluido) {
        res.status(200).json({
          message: "Talão excluído com sucesso!",
          talao: talaoExcluido,
        });
      } else {
        res.status(404).json({ message: "Talão não encontrado." });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ message: "Erro ao excluir talão", error: erro.message });
    }
  });

// Rota para servir a página de gestão de recebimento de talões
router.get("/receive", async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../../frontEnd/pageRecebimento.html"));
    const taloes = await consultarRecebimento();
    res.status(200).json(taloes); // Retorna todas as solicitações de talões
  } catch (erro) {
    res
      .status(500)
      .json({ message: "Erro ao consultar talões", error: erro.message });
  }
});

module.exports = router;
