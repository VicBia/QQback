const pool = require('../config/database');


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
        console.error('Erro ao inserir usuário:', erro);
        throw erro;
    }
}

module.exports = { inserirUsuario };
