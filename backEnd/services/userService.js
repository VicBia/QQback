const pool = require("../config/database");
const bcrypt = require("bcrypt");
const { hashPassword } = require("../utils/hashPassword");

// Função para inserir um novo usuário
async function inserirUsuario(
  registration,
  user_name,
  email,
  user_password,
  id_store
) {
  // Captura a data e hora atual
  const registration_date = new Date();
  const passwordEncrypted = hashPassword(user_password);

  const query = `
      INSERT INTO users (registration, user_name, email, user_password, id_store, registration_date)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
`;

  const valores = [
    registration,
    user_name,
    email,
    passwordEncrypted,
    id_store,
    registration_date,
  ];

  try {
    const resultado = await pool.query(query, valores);

    // Inserindo também na tabela UserProfile
    const associarPerfilQuery = `
        INSERT INTO userprofile (registration, id_profile, association_date)
        VALUES ($1, $2, $3)
    `;
    const perfil_id = 2; // Defina o ID do perfil que deseja associar, pode vir de outra lógica
    const associacaoData = new Date(); // Data de associação

    await pool.query(associarPerfilQuery, [
      registration,
      perfil_id,
      associacaoData,
    ]);

    return resultado.rows[0]; // Retorna o usuário inserido
  } catch (erro) {
    console.error("Erro ao inserir usuário:", erro);
    throw erro;
  }
}

// Função para consultar todos os usuários
async function consultarUsuarios() {
  const query = `
        SELECT * FROM users;
    `;

  try {
    const resultado = await pool.query(query);
    return resultado.rows; // Retorna todos os usuários
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
  // Atualiza a data de registro no momento da edição
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
