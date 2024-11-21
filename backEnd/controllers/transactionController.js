const transactionService = require("../services/transactionService");

// Rota para servir a página de transações
exports.listTransactions = async (req, res) => {
  try {
    const taloes = await transactionService.consultarEnvio();
    res.status(200).json(taloes); // Retorna todas as solicitações de talões
  } catch (erro) {
    res
      .status(500)
      .json({ message: "Erro ao consultar talões", error: erro.message });
  }
};

exports.registerTransaction = async (req, res) => {
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
    const novaSolicitacao = await transactionService.inserirEnvio(
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
    });
  } catch (erro) {
    res.status(500).json({
      message: "Erro ao cadastrar envio ou atualizar talão",
      error: erro.message,
    });
  }
};

exports.editTransaction = async (req, res) => {
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
    const talaoAtualizado = await transactionService.atualizarTalao(
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
};

exports.deleteTransaction = async (req, res) => {
  const { id_transaction } = req.params;

  try {
    const talaoExcluido = await transactionService.deletarTalao(id_transaction);
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
};
