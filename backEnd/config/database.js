const { Sequelize } = require('sequelize');
require('dotenv').config(); 

// Configuração do Sequelize para o PostgreSQL
const sequelize = new Sequelize(
    process.env.DB_NAME || 'beAba',     
    process.env.DB_USER || 'postgres',     
    process.env.DB_PASSWORD || 'postgres',     
    {
        host: process.env.DB_HOST || 'localhost', 
        dialect: 'postgres',             
        port: process.env.DB_PORT || 5432, 
        logging: false,                  
    }
);

// Testa a conexão ao banco de dados
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão estabelecida com sucesso ao banco de dados!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
})();

module.exports = sequelize;

// const { Pool } = require('pg');

// // Configuração do pool de conexão
// const pool = new Pool({
//     user: 'postgres',            // Nome de usuário do PostgreSQL
//     host: 'localhost',            // Host do banco de dados
//     database: 'beAba',        // Nome do banco de dados
//     password: 'postgres',             // Senha do banco de dados
//     port: 5432,                   // Porta padrão do PostgreSQL
// });

// // Testa a conexão ao banco de dados
// pool.connect((err, client, release) => {
//     if (err) {
//         return console.error('Erro ao conectar ao banco de dados:', err.stack);
//     }
//     console.log('Conexão estabelecida com sucesso ao banco de dados!');
//     release();  // Libera o cliente após o teste de conexão
// });

// module.exports = pool;
