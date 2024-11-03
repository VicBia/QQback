const pool = require('../config/database');


// Função para inserir um novo usuário
async function inserirUsuario(nome, matricula, email, senha, perfil = 'usuario') {
    const query = `
        INSERT INTO usuarios (nome, matricula, email, senha, perfil)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const valores = [nome, matricula, email, senha, perfil];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0]; // Retorna o usuário inserido
    } catch (erro) {
        console.error('Erro ao inserir usuário:', erro);
        throw erro;
    }
}

module.exports = { inserirUsuario };
