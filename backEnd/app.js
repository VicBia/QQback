const express = require("express");
const path = require("path");

// Arquivos de rota
const loginRoutes = require("./routes/loginRoutes");
const admRoutes = require("./routes/admRoutes");
const lojaRoutes = require("./routes/lojaRoutes");
const relatorioRoutes = require("./routes/relatorioRoutes");
const taloesRoutes = require("./routes/taloesRoutes");
const transacaoRoutes = require("./routes/transacaoRoutes");

const app = express();

// Middleware para servir arquivos estáticos (CSS e JS)
app.use(express.static(path.join(__dirname, "../frontEnd")));

// Rotas para as páginas HTML
app.use("/login", loginRoutes);
app.use("/restrict", admRoutes);
app.use("/store", lojaRoutes);
app.use("/reports", relatorioRoutes);
app.use("/stalks", taloesRoutes);
app.use("/transactions", transacaoRoutes);


module.exports = app;
