const sequelize = require('./config/database'); 
const app = require("./app");
const PORT = process.env.PORT || 3000;

(async () => {
  try {
      await sequelize.sync({ force: false }); 
      console.log('Banco de dados sincronizado com sucesso!');
      
      app.listen(PORT, () => {
          console.log(`Servidor rodando na porta ${PORT}`);
      });
  } catch (error) {
      console.error('Erro ao sincronizar o banco de dados:', error);
  }
})();