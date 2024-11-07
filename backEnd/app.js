const express = require("express");
const path = require("path");

// Arquivos de rota
const loginRoutes = require("./routes/userRoutes");
const admRoutes = require("./routes/profileRoutes");
const lojaRoutes = require("./routes/storeRoutes");
const relatorioRoutes = require("./routes/relatorioRoutes");
const taloesRoutes = require("./routes/taloesRoutes");
const transacaoRoutes = require("./routes/transacaoRoutes");

const app = express();
app.use(express.json());

// Middleware para servir arquivos estáticos (CSS e JS)
app.use(express.static(path.join(__dirname, "../frontEnd")));

// Rotas para as páginas HTML
app.use("/", loginRoutes);
app.use("/", admRoutes);
app.use("/", lojaRoutes);
app.use("/", relatorioRoutes);
app.use("/", taloesRoutes);
app.use("/", transacaoRoutes);

module.exports = app;
