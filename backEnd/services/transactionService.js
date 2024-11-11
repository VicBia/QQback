const pool = require("../config/database");

// Função para consultar todos os talões
async function consultarEnvio() {
  const query = `
        SELECT * FROM transaction;
    `;

  try {
    const resultado = await pool.query(query);
    return resultado.rows; // Retorna todos os talões
  } catch (erro) {
    console.error("Erro ao consultar os talões:", erro);
    throw erro;
  }
}

// Função para inserir o envio na tabela transacoes/envio
async function inserirEnvio(
  shipment = null,
  id_talon,
  status,
  shipment_transaction = null,
  expected_time = null,
  receipt_transaction = null,
  received_by_registration = null
) {
  const queryInsert = `
        INSERT INTO transaction (shipment, id_talon, status, shipment_transaction, expected_time, receipt_transaction, received_by_registration)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;

  const valores = [
    shipment,
    id_talon,
    status,
    shipment_transaction,
    expected_time,
    receipt_transaction,
    received_by_registration,
  ];

  try {
    // Executar o INSERT na tabela de transações
    const resultado = await pool.query(queryInsert, valores);
    return resultado.rows[0]; // Retorna o envio inserido
  } catch (erro) {
    console.error("Erro ao inserir envio:", erro);
    throw erro;
  }
}

// Função para atualizar a tabela taloes com os campos de remessa e status
async function atualizarTalao(
  id_transaction,
  shipment = null,
  id_talon,
  status,
  shipment_transaction = null,
  expected_time = null,
  receipt_transaction = null,
  received_by_registration = null
) {
  const queryUpdate = `
        UPDATE transaction
        SET shipment = $2, id_talon = $3, status = $4, shipment_transaction = $5, expected_time = $6, receipt_transaction = $7, received_by_registration = $8
        WHERE id_transaction = $1
        RETURNING *;
    `;

  const valores = [
    id_transaction,
    shipment,
    id_talon,
    status,
    shipment_transaction,
    expected_time,
    receipt_transaction,
    received_by_registration,
  ];

  try {
    // Executar o UPDATE na tabela taloes
    const resultado = await pool.query(queryUpdate, valores);
    return resultado.rows[0]; // Retorna o talão atualizado
  } catch (erro) {
    console.error("Erro ao atualizar talão:", erro);
    throw erro;
  }
}

// Função para excluir um envio
async function deletarEnvio(id_talao) {
  const query = `
        DELETE FROM transaction
        WHERE id_talao = $1
        RETURNING *;
    `;

  try {
    const resultado = await pool.query(query, [id_talao]);
    return resultado.rows[0]; // Retorna o talão excluído, ou undefined se não encontrado
  } catch (erro) {
    console.error("Erro ao excluir talão:", erro);
    throw erro;
  }
}

module.exports = { consultarEnvio, inserirEnvio, atualizarTalao };
