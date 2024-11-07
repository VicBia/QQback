const pool = require("../config/database");

// Função para inserir um novo estoque
async function inserirSolicitacao(id_loja, quantidade_taloes, status) {
  const query = `
        INSERT INTO taloes (id_loja, quantidade_taloes, status)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

  const valores = [id_loja, quantidade_taloes, status];

  try {
    const resultado = await pool.query(query, valores);
    return resultado.rows[0]; // Retorna a solicitacao inserida
  } catch (erro) {
    console.error("Erro ao inserir solicitação:", erro);
    throw erro;
  }
}

// Função para consultar todos os estoques
async function consultarTaloes() {
  const query = `
        SELECT * FROM taloes;
    `;

  try {
    const resultado = await pool.query(query);
    return resultado.rows; // Retorna todos os talões
  } catch (erro) {
    console.error("Erro ao consultar os talões:", erro);
    throw erro;
  }
}

// Função para editar um estoque
// Função para editar um talão
async function editarTalao(
  id_talao,
  quantidade_taloes,
  remessa,
  status,
  id_loja
) {
  const query = `
        UPDATE taloes
        SET quantidade_taloes = $2, remessa = $3, status = $4, id_loja = $5
        WHERE id_talao = $1
        RETURNING *;
    `;

  const valores = [id_talao, quantidade_taloes, remessa, status, id_loja];

  try {
    const resultado = await pool.query(query, valores);
    return resultado.rows[0]; // Retorna o talão atualizado
  } catch (erro) {
    console.error("Erro ao editar talão:", erro);
    throw erro;
  }
}

// Função para excluir um estoque
async function deletarTalao(id_talao) {
  const query = `
        DELETE FROM taloes
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

module.exports = {
  inserirSolicitacao,
  consultarTaloes,
  editarTalao,
  deletarTalao,
};
