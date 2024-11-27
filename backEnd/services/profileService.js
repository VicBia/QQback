const pool = require("../config/database");
const Profile = require("../models/Profile");

// Função para inserir um novo perfil
async function inserirPerfil(profile_name, description) {
  try {
    const novoPerfil = await Profile.create({ profile_name, description });
    return novoPerfil; // Retorna o perfil inserido
  } catch (error) {
    console.error("Erro ao inserir perfil:", error);
    throw error;
  }
}

// Função para consultar todos os perfils
async function consultarPerfis() {
  try {
    const perfis = await Profile.findAll();
    return perfis; // Retorna todos os perfils
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
