const Transaction = require("../models/Transaction");

// Função para consultar todas as transações
async function consultarTransacao() {
  try {
    const transacoes = await Transaction.findAll();
    return transacoes; // Retorna todas as transações
  } catch (erro) {
    console.error("Erro ao consultar os talões:", erro);
    throw erro;
  }
}

// Função para inserir uma nova transação
async function inserirTransacao(
  shipment = null,
  id_talon,
  status,
  shipment_transaction = null,
  expected_time = null,
  receipt_transaction = null,
  received_by_registration = null
) {
  try {
    const novaTransacao = await Transaction.create({
      shipment,
      id_talon,
      status,
      shipment_transaction,
      expected_time,
      receipt_transaction,
      received_by_registration,
    });

    return novaTransacao; // Retorna a transação inserida
  } catch (erro) {
    console.error("Erro ao inserir transação:", erro);
    throw erro;
  }
}

// Função para atualizar uma transação existente
async function atualizarTransacao(
  id_transaction,
  shipment = null,
  id_talon,
  status,
  shipment_transaction = null,
  expected_time = null,
  receipt_transaction = null,
  received_by_registration = null
) {
  try {
    const transacaoAtualizada = await Transaction.update(
      {
        shipment,
        id_talon,
        status,
        shipment_transaction,
        expected_time,
        receipt_transaction,
        received_by_registration,
      },
      {
        where: { id_transaction },
        returning: true, // Retorna o registro atualizado
      }
    );

    if (transacaoAtualizada[0] === 0) {
      return null;
    }
    return transacaoAtualizada; // Retorna a transação atualizada
  } catch (erro) {
    console.error("Erro ao atualizar transação:", erro);
    throw erro;
  }
}

// Função para excluir uma transação
async function deletarTransacao(id_transaction) {
  try {
    const transacaoDeletada = await Transaction.destroy({
      where: { id_transaction },
      returning: true, // Retorna o registro deletado
    });

    if (transacaoDeletada === 0) {
      return null; // Se não encontrar a transação para excluir
    }
    return transacaoDeletada; // Retorna a transação excluída
  } catch (erro) {
    console.error("Erro ao excluir transação:", erro);
    throw erro;
  }
}

module.exports = {
  consultarTransacao,
  inserirTransacao,
  atualizarTransacao,
  deletarTransacao,
};
