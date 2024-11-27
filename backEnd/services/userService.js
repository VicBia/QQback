const pool = require("../config/database");
const { hashPassword } = require("../utils/hashPassword");
const User = require("../models/User");
const UserProfile = require("../models/UserProfile");

// Função para inserir um novo usuário
async function inserirUsuario(
  registration,
  user_name,
  email,
  user_password,
  id_store
) {
  const registration_date = new Date();
  const passwordEncrypted = await hashPassword(user_password);

  try {
    const novoUsuario = await User.create({
      registration,
      user_name,
      email,
      user_password: passwordEncrypted, 
      id_store,
      registration_date,
    });

    const perfil_id = 1; 
    const associacaoData = new Date(); 

    // Criar a associação do perfil
    await UserProfile.create({
      registration: novoUsuario.registration, 
      id_profile: perfil_id,
      association_date: associacaoData,
    });

    return novoUsuario; 
  } catch (erro) {
    console.error("Erro ao inserir usuário:", erro);
    throw erro;
  }
}

// Função para consultar todos os usuários
async function consultarUsuarios() {
  try {
    const usuarios = await User.findAll();
    return usuarios; 
  } catch (erro) {
    console.error("Erro ao consultar os usuários:", erro);
    throw erro;
  }
}

// Função para editar um usuário
async function editarUsuario(
  registration,
  user_name,
  email,
  user_password,
  id_store
) {
  const registration_date = new Date();

  const query = `
          UPDATE users
          SET user_name = $2, email = $3, user_password = $4, id_store = $5, registration_date = $6
          WHERE registration = $1
          RETURNING *;
      `;

  const valores = [
    registration,
    user_name,
    email,
    user_password,
    id_store,
    registration_date,
  ];

  try {
    const resultado = await pool.query(query, valores);
    return resultado.rows[0]; // Retorna o usuário atualizado
  } catch (erro) {
    console.error("Erro ao editar usuário:", erro);
    throw erro;
  }
}

// Função para excluir um usuário e suas associações
async function deletarUsuario(registration) {
  try {
    await pool.query("BEGIN");

    // Exclui as associações da tabela userprofile
    const deletarAssociacoesQuery = `
      DELETE FROM userprofile
      WHERE registration = $1;
    `;
    await pool.query(deletarAssociacoesQuery, [registration]);

    // Exclui o usuário da tabela users
    const deletarUsuarioQuery = `
      DELETE FROM users
      WHERE registration = $1
      RETURNING *;
    `;
    const resultado = await pool.query(deletarUsuarioQuery, [registration]);

    // Confirma a transação
    await pool.query("COMMIT");

    return resultado.rows[0]; // Retorna o usuário excluído, ou undefined se não encontrado
  } catch (erro) {
    // Em caso de erro, desfaz a transação
    await pool.query("ROLLBACK");
    console.error("Erro ao excluir usuário e associações:", erro);
    throw erro;
  }
}

module.exports = {
  consultarUsuarios,
  inserirUsuario,
  editarUsuario,
  deletarUsuario,
};
