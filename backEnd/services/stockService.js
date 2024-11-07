const pool = require("../config/database");

// Função para inserir um novo estoque
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

// Função para consultar todos os estoques
async function consultarEstoques() {
  const query = `
        SELECT * FROM estoque;
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
  id_estoque,
  id_loja,
  quantidade_atual,
  quantidade_recomendada,
  quantidade_min
) {
  const query = `
        UPDATE estoque
        SET id_loja = $2, quantidade_atual = $3, quantidade_recomendada = $4, quantidade_min = $5
        WHERE id_estoque = $1
        RETURNING *;
    `;

  const valores = [
    id_estoque,
    id_loja,
    quantidade_atual,
    quantidade_recomendada,
    quantidade_min,
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
async function deletarEstoque(id_estoque) {
  const query = `
        DELETE FROM estoque
        WHERE id_estoque = $1
        RETURNING *;
    `;

  try {
    const resultado = await pool.query(query, [id_estoque]);
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
