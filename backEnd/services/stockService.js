const pool = require("../config/database");

// Função para inserir um novo estoque
async function inserirEstoque(
  id_store,
  current_quantity,
  recommended_quantity,
  minimum_quantity
) {
  const query = `
        INSERT INTO stock (id_store, current_quantity, recommended_quantity, minimum_quantity)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

  const valores = [
    id_store,
    current_quantity,
    recommended_quantity,
    minimum_quantity,
  ];

  try {
    const resultado = await pool.query(query, valores);
    return resultado.rows[0]; // Retorna o estoque inserido
  } catch (erro) {
    console.error("Erro ao inserir estoque:", erro);
    throw erro;
  }
}

// Função para consultar todos os estoques
async function consultarEstoques() {
  const query = `
        SELECT * FROM stock;
    `;

  try {
    const resultado = await pool.query(query);
    return resultado.rows; // Retorna todos os estoques
  } catch (erro) {
    console.error("Erro ao consultar os estoques:", erro);
    throw erro;
  }
}

// Função para editar um estoque
async function editarEstoque(
  id_stock,
  id_store,
  current_quantity,
  recommended_quantity,
  minimum_quantity
) {
  const query = `
        UPDATE stock
        SET id_store = $2, current_quantity = $3, recommended_quantity = $4, minimum_quantity = $5
        WHERE id_stock = $1
        RETURNING *;
    `;

  const valores = [
    id_stock,
    id_store,
    current_quantity,
    recommended_quantity,
    minimum_quantity,
  ];

  try {
    const resultado = await pool.query(query, valores);
    return resultado.rows[0]; // Retorna o estoque atualizado
  } catch (erro) {
    console.error("Erro ao editar estoque:", erro);
    throw erro;
  }
}

// Função para excluir um estoque
async function deletarEstoque(id_stock) {
  const query = `
        DELETE FROM stock
        WHERE id_stock = $1
        RETURNING *;
    `;

  try {
    const resultado = await pool.query(query, [id_stock]);
    return resultado.rows[0]; // Retorna o estoque excluído, ou undefined se não encontrado
  } catch (erro) {
    console.error("Erro ao excluir estoque:", erro);
    throw erro;
  }
}

module.exports = {
  inserirEstoque,
  consultarEstoques,
  editarEstoque,
  deletarEstoque,
};
