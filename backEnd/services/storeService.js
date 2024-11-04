const pool = require("../config/database");

// Função para inserir uma nova loja
async function inserirLoja(numero_loja, nome_loja) {
  const query = `
        INSERT INTO loja (numero_loja, nome_loja)
        VALUES ($1, $2)
        RETURNING *;
    `;

  const valores = [numero_loja, nome_loja];

  try {
    const resultado = await pool.query(query, valores);
    return resultado.rows[0]; // Retorna a loja inserida
  } catch (erro) {
    console.error("Erro ao inserir loja:", erro);
    throw erro;
  }
}

module.exports = { inserirLoja };
