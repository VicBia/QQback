const pool = require("../config/database");

// Função para inserir um novo talão
async function inserirSolicitacao(
  id_store,
  talon_quantity,
  requester_registration
) {
  const query = `
        INSERT INTO talons (id_store, talon_quantity, requester_registration)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

  const valores = [id_store, talon_quantity, requester_registration];

  try {
    // Inserir na tabela talons
    const resultado = await pool.query(query, valores);
    const id_talon = resultado.rows[0].id_talon; // Obter o ID do talon inserido

    // Inserir na tabela transaction
    const associarTransactionQuery = `
        INSERT INTO transaction (id_talon, status)
        VALUES ($1, $2)
    `;

    const status = "requested"; // Definir o status padrão para a transação

    await pool.query(associarTransactionQuery, [id_talon, status]);

    return resultado.rows[0]; // Retorna a solicitação inserida
  } catch (erro) {
    console.error("Erro ao inserir solicitação:", erro);
    throw erro;
  }
}

// Função para consultar todos os talões
async function consultarTaloes() {
  const query = `
        SELECT * FROM talons;
    `;

  try {
    const resultado = await pool.query(query);
    return resultado.rows; // Retorna todos os talões
  } catch (erro) {
    console.error("Erro ao consultar os talões:", erro);
    throw erro;
  }
}

// Função para editar um talão
async function editarTalao(
  id_talon,
  talon_quantity,
  requester_registration,
  id_store
) {
  const query = `
        UPDATE talons
        SET talon_quantity = $2, requester_registration = $3, id_store = $4
        WHERE id_talon = $1
        RETURNING *;
    `;

  const valores = [id_talon, talon_quantity, requester_registration, id_store];

  try {
    const resultado = await pool.query(query, valores);
    return resultado.rows[0]; // Retorna o talão atualizado
  } catch (erro) {
    console.error("Erro ao editar talão:", erro);
    throw erro;
  }
}

// Função para excluir um talão
async function deletarTalao(id_talon) {
  const query = `
        DELETE FROM talons
        WHERE id_talon = $1
        RETURNING *;
    `;

  try {
    const resultado = await pool.query(query, [id_talon]);
    return resultado.rows[0]; // Retorna o talão excluído, ou undefined se não encontrado
  } catch (erro) {
    console.error("Erro ao excluir talão:", erro);
    throw erro;
  }
}

module.exports = {
  inserirSolicitacao,
  consultarTaloes,
  editarTalao,
  deletarTalao,
};
