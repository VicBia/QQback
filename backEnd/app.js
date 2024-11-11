const express = require("express");
const path = require("path");

// Arquivos de rota
const loginRoutes = require("./routes/userRoutes");
const admRoutes = require("./routes/profileRoutes");
const lojaRoutes = require("./routes/storeRoutes");
const relatorioRoutes = require("./routes/relatorioRoutes");
const stockRoutes = require("./routes/stockRoutes");
const talonsRoutes = require("./routes/talonsRoutes");
const transacaoRoutes = require("./routes/transactionRoutes");
const userprofileRoutes = require("./routes/userprofileRoutes");

const app = express();
app.use(express.json());

// Middleware para servir arquivos estáticos (CSS e JS)
app.use(express.static(path.join(__dirname, "../frontEnd")));

// Rotas para as páginas HTML
app.use("/", loginRoutes);
app.use("/", admRoutes);
app.use("/", lojaRoutes);
app.use("/", relatorioRoutes);
app.use("/", stockRoutes);
app.use("/", talonsRoutes);
app.use("/", transacaoRoutes);
app.use("/", userprofileRoutes);

module.exports = app;
