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

module.exports = { inserirSolicitacao };
