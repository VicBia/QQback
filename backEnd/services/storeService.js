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

// Função para consultar todos as lojas
async function consultarLojas() {
  const query = `
      SELECT * FROM loja;
  `;

  try {
    const resultado = await pool.query(query);
    return resultado.rows; // Retorna todas as lojas
  } catch (erro) {
    console.error("Erro ao consultar os perfis:", erro);
    throw erro;
  }
}

// Função para editar uma loja
async function editarLoja(id_loja, numero_loja, nome_loja) {
  const query = `
      UPDATE loja
      SET numero_loja = $2, nome_loja = $3
      WHERE id_loja = $1
      RETURNING *;
  `;

  const valores = [id_loja, numero_loja, nome_loja];

  try {
    const resultado = await pool.query(query, valores);
    return resultado.rows[0]; // Retorna a loja atualizada
  } catch (erro) {
    console.error("Erro ao editar perfil:", erro);
    throw erro;
  }
}

// Função para excluir uma loja
async function deletarLoja(id_loja) {
  const query = `
      DELETE FROM loja
      WHERE id_loja = $1
      RETURNING *;
  `;

  try {
    const resultado = await pool.query(query, [id_loja]);
    return resultado.rows[0]; // Retorna a loja excluída, ou undefined se não encontrado
  } catch (erro) {
    console.error("Erro ao deletar perfil:", erro);
    throw erro;
  }
}

module.exports = { inserirLoja, consultarLojas, editarLoja, deletarLoja };
