const pool = require("../config/database");

// Função para inserir um novo usuário
async function inserirAssociacao(registration, id_profile) {
  // Captura a data e hora atual
  const association_date = new Date();

  const query = `
        INSERT INTO userprofile (registration, id_profile, association_date)
        VALUES ($1, $2, $3)
`;

  const valores = [registration, id_profile, association_date];

  try {
    const resultado = await pool.query(query, valores);
    return resultado.rows[0]; // Retorna o usuário inserido
  } catch (erro) {
    console.error("Erro ao inserir usuário:", erro);
    throw erro;
  }
}

// Função para consultar todos os usuários
async function consultarAssociacao() {
  const query = `
        SELECT * FROM userprofile;
    `;

  try {
    const resultado = await pool.query(query);
    return resultado.rows; // Retorna todos os usuários
  } catch (erro) {
    console.error("Erro ao consultar as associações:", erro);
    throw erro;
  }
}

// Função para editar um usuário
async function editarAssociacao(
  registration,
  id_profile
) {
  // Atualiza a data de registro no momento da edição
  const association_date = new Date();

  const query = `
          UPDATE userprofile
          SET id_profile = $2, association_date = $3
          WHERE registration = $1
          RETURNING *;
      `;

  const valores = [
    registration,
    id_profile,
    association_date
  ];

  try {
    const resultado = await pool.query(query, valores);
    return resultado.rows[0]; // Retorna a associação atualizado
  } catch (erro) {
    console.error("Erro ao editar associação:", erro);
    throw erro;
  }
}

// Função para excluir um usuário
async function deletarAssociacao(registration, id_profile) {
  const query = `
        DELETE FROM userprofile
        WHERE registration = $1 AND id_profile = $2
        RETURNING *;
  `;

  try {
    const resultado = await pool.query(query, [registration, id_profile]);
    return resultado.rowCount > 0 ? resultado.rows[0] : null; // Retorna o usuário excluído, ou undefined se não encontrado
  } catch (erro) {
    console.error("Erro ao excluir associação:", erro);
    throw erro;
  }
}

module.exports = {
  consultarAssociacao,
  inserirAssociacao,
  editarAssociacao,
  deletarAssociacao,
};
