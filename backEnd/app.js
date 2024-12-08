const express = require("express");
const path = require("path");
const cors = require("cors"); // Importando o CORS

// Arquivos de rota
const loginRoutes = require("./routes/userRoutes");
const admRoutes = require("./routes/profileRoutes");
const lojaRoutes = require("./routes/storeRoutes");
const stockRoutes = require("./routes/stockRoutes");
const talonsRoutes = require("./routes/talonsRoutes");
const transacaoRoutes = require("./routes/transactionRoutes");
const userprofileRoutes = require("./routes/userprofileRoutes");
const reportRoutes = require("./routes/reportRoutes"); // Adiciona a nova rota de relatórios

const authRoutes = require('./routes/authRoutes'); // Rotas de autenticação
const protectedRoutes = require('./routes/protectedRoutes'); // Rotas protegidas
require('dotenv').config(); // Configuração do arquivo .env para variáveis de ambiente

const viewRoutes = require("./routes/viewRoutes");

const app = express();
app.use(express.json());

// Configuração do CORS (permite requisições de qualquer origem)
app.use(cors()); // Adicionando o middleware de CORS

// Middleware para servir arquivos estáticos (CSS e JS)
app.use(express.static(path.join(__dirname, "../frontEnd")));

// Rotas públicas
app.use('/api/auth', authRoutes); // Rota de login e autenticação

// Middleware para proteger rotas privadas (aplica JWT)
app.use('/api', protectedRoutes); // Rotas protegidas que requerem autenticação

// Rotas para as páginas HTML
app.use("/", viewRoutes);

// Outras rotas da aplicação
app.use("/", loginRoutes);
app.use("/", admRoutes);
app.use("/", lojaRoutes);
app.use("/", stockRoutes);
app.use("/", talonsRoutes);
app.use("/", transacaoRoutes);
app.use("/", userprofileRoutes);

// Nova rota para relatórios
app.use("/", reportRoutes); // Adiciona a rota de exportação de usuários

module.exports = app;
