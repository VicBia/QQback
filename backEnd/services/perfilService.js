const pool = require("../config/database");

// Função para inserir um novo perfil
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

// Função para consultar todos os perfils
async function consultarPerfis() {
  const query = `
      SELECT * FROM perfil;
  `;

  try {
    const resultado = await pool.query(query);
    return resultado.rows; // Retorna todos os perfils
  } catch (erro) {
    console.error("Erro ao consultar os perfis:", erro);
    throw erro;
  }
}

// Função para editar um perfil
async function editarPerfil(id_perfil, nome_perfil, descricao) {
  const query = `
      UPDATE perfil
      SET nome_perfil = $2, descricao = $3
      WHERE id_perfil = $1
      RETURNING *;
  `;

  const valores = [id_perfil, nome_perfil, descricao];

  try {
    const resultado = await pool.query(query, valores);
    return resultado.rows[0]; // Retorna o perfil atualizado
  } catch (erro) {
    console.error("Erro ao editar perfil:", erro);
    throw erro;
  }
}

// Função para excluir um perfil
async function deletarPerfil(id_perfil) {
  const query = `
      DELETE FROM perfil
      WHERE id_perfil = $1
      RETURNING *;
  `;

  try {
    const resultado = await pool.query(query, [id_perfil]);
    return resultado.rows[0]; // Retorna o perfil excluído, ou undefined se não encontrado
  } catch (erro) {
    console.error("Erro ao deletar perfil:", erro);
    throw erro;
  }
}

module.exports = {
  inserirPerfil,
  consultarPerfis,
  editarPerfil,
  deletarPerfil,
};
