const express = require("express");
const path = require("path");

// Arquivos de rota
const loginRoutes = require("./routes/userRoutes");
const admRoutes = require("./routes/profileRoutes");
const lojaRoutes = require("./routes/storeRoutes");
const stockRoutes = require("./routes/stockRoutes");
const talonsRoutes = require("./routes/talonsRoutes");
const transacaoRoutes = require("./routes/transactionRoutes");
const userprofileRoutes = require("./routes/userprofileRoutes");

const authRoutes = require('./routes/authRoutes'); // Rotas de autenticação
const protectedRoutes = require('./routes/protectedRoutes'); // Rotas protegidas
require('dotenv').config(); // Configuração do arquivo .env para variáveis de ambiente

const viewRoutes = require("./routes/viewRoutes");

const app = express();
app.use(express.json());

// Middleware para servir arquivos estáticos (CSS e JS)
app.use(express.static(path.join(__dirname, "../frontEnd")));

// Rotas públicas
app.use('/api/auth', authRoutes); // Rota de login e autenticação

// Middleware para proteger rotas privadas (aplica JWT)
app.use('/api', protectedRoutes); // Rotas protegidas que requerem autenticação

// Rotas para as páginas HTML
app.use("/", viewRoutes);

app.use("/", loginRoutes);
app.use("/", admRoutes);
app.use("/", lojaRoutes);
app.use("/", stockRoutes);
app.use("/", talonsRoutes);
app.use("/", transacaoRoutes);
app.use("/", userprofileRoutes);

module.exports = app;
