const fs = require('fs');
const path = require('path');
const { getUsers } = require('../services/reportService');
const { execPython } = require('../utils/execPython');

async function exportUsers(req, res) {
  try {
    console.log("Iniciando exportação...");  // LOG
    const { option, userStoreId, specificStores } = req.body;

    // Obter os dados dos usuários
    const usersData = await getUsers(option, userStoreId, specificStores);
    console.log("Usuários obtidos:", usersData.length);  // LOG

    // Convertendo para JSON e salvando em arquivo temporário
    const jsonData = JSON.stringify(usersData, null, 2);
    const tempFilePath = path.join(__dirname, '../temp/users_data.json');
    fs.writeFileSync(tempFilePath, jsonData);

    // Executando script Python para exportar os dados
    const result = await execPython(tempFilePath);
    console.log("Arquivo gerado em:", result);  // LOG

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao exportar dados.');
  }
}

module.exports = { exportUsers };
