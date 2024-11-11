const pool = require("../config/database");

// Função para inserir um novo perfil
async function inserirPerfil(profile_name, description) {
  const query = `
        INSERT INTO profile (profile_name, description)
        VALUES ($1, $2)
        RETURNING *;
    `;

  const valores = [profile_name, description];

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
      SELECT * FROM profile;
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
async function editarPerfil(id_profile, profile_name, description) {
  const query = `
      UPDATE profile
      SET profile_name = $2, description = $3
      WHERE id_profile = $1
      RETURNING *;
  `;

  const valores = [id_profile, profile_name, description];

  try {
    const resultado = await pool.query(query, valores);
    return resultado.rows[0]; // Retorna o perfil atualizado
  } catch (erro) {
    console.error("Erro ao editar perfil:", erro);
    throw erro;
  }
}

// Função para excluir um perfil
async function deletarPerfil(id_profile) {
  const query = `
      DELETE FROM profile
      WHERE id_profile = $1
      RETURNING *;
  `;

  try {
    const resultado = await pool.query(query, [id_profile]);
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
