const pool = require("../config/database");

// Função para inserir uma nova loja
async function inserirPerfil(nome_perfil, descricao) {
  const query = `
        INSERT INTO perfil (nome_perfil, descricao)
        VALUES ($1, $2)
        RETURNING *;
    `;

  const valores = [nome_perfil, descricao];

  try {
    const resultado = await pool.query(query, valores);
    return resultado.rows[0]; // Retorna o perfil inserido
  } catch (erro) {
    console.error("Erro ao inserir perfil:", erro);
    throw erro;
  }
}

module.exports = { inserirPerfil };
