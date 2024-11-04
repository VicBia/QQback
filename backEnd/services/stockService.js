const pool = require("../config/database");

// Função para inserir uma nova loja
async function inserirEstoque(
  id_loja,
  quantidade_atual,
  quantidade_recomendada,
  quantidade_min
) {
  const query = `
        INSERT INTO estoque (id_loja, quantidade_atual, quantidade_recomendada, quantidade_min)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

  const valores = [
    id_loja,
    quantidade_atual,
    quantidade_recomendada,
    quantidade_min,
  ];

  try {
    const resultado = await pool.query(query, valores);
    return resultado.rows[0]; // Retorna o estoque inserido
  } catch (erro) {
    console.error("Erro ao inserir estoque:", erro);
    throw erro;
  }
}

module.exports = { inserirEstoque };
