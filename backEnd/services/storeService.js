const pool = require("../config/database");

// Função para inserir uma nova loja
async function inserirLoja(store_number, store_name) {
  const query = `
        INSERT INTO store (store_number, store_name)
        VALUES ($1, $2)
        RETURNING *;
    `;

  const valores = [store_number, store_name];

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
      SELECT * FROM store;
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
async function editarLoja(id_store, store_number, store_name) {
  const query = `
      UPDATE store
      SET store_number = $2, store_name = $3
      WHERE id_store = $1
      RETURNING *;
  `;

  const valores = [id_store, store_number, store_name];

  try {
    const resultado = await pool.query(query, valores);
    return resultado.rows[0]; // Retorna a loja atualizada
  } catch (erro) {
    console.error("Erro ao editar perfil:", erro);
    throw erro;
  }
}

// Função para excluir uma loja
async function deletarLoja(id_store) {
  const query = `
      DELETE FROM store
      WHERE id_store = $1
      RETURNING *;
  `;

  try {
    const resultado = await pool.query(query, [id_store]);
    return resultado.rows[0]; // Retorna a loja excluída, ou undefined se não encontrado
  } catch (erro) {
    console.error("Erro ao deletar perfil:", erro);
    throw erro;
  }
}

module.exports = { inserirLoja, consultarLojas, editarLoja, deletarLoja };
