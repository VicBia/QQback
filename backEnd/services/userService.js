const pool = require("../config/database");

// Função para inserir um novo usuário
async function inserirUsuario(matricula, nome_usuario, email, senha, id_loja) {
  const query = `
        INSERT INTO usuario (matricula, nome_usuario, email, senha, id_loja)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

  const valores = [matricula, nome_usuario, email, senha, id_loja];

  try {
    const resultado = await pool.query(query, valores);
    return resultado.rows[0]; // Retorna o usuário inserido
  } catch (erro) {
    console.error("Erro ao inserir usuário:", erro);
    throw erro;
  }
}

// Função para consultar todos as lojas
async function consultarUsuarios() {
  const query = `
        SELECT * FROM usuario;
    `;

  try {
    const resultado = await pool.query(query);
    return resultado.rows; // Retorna todas as lojas
  } catch (erro) {
    console.error("Erro ao consultar os perfis:", erro);
    throw erro;
  }
}

// Função para editar um usuário
async function editarUsuario(matricula, nome_usuario, email, senha, id_loja) {
  const query = `
          UPDATE usuario
          SET nome_usuario = $2, email = $3, senha = $4, id_loja = $5
          WHERE matricula = $1
          RETURNING *;
      `;

  const valores = [matricula, nome_usuario, email, senha, id_loja];

  try {
    const resultado = await pool.query(query, valores);
    return resultado.rows[0]; // Retorna o usuário atualizado
  } catch (erro) {
    console.error("Erro ao editar usuário:", erro);
    throw erro;
  }
}

// Função para excluir um usuário
async function deletarUsuario(matricula) {
  const query = `
          DELETE FROM usuario
          WHERE matricula = $1
          RETURNING *;
      `;

  try {
    const resultado = await pool.query(query, [matricula]);
    return resultado.rows[0]; // Retorna o usuário excluído, ou undefined se não encontrado
  } catch (erro) {
    console.error("Erro ao excluir usuário:", erro);
    throw erro;
  }
}

module.exports = { consultarUsuarios, inserirUsuario, editarUsuario, deletarUsuario };
