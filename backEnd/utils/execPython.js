const { exec } = require('child_process');

function execPython(filePath) {
  return new Promise((resolve, reject) => {
    exec(`python ${__dirname}/../scripts/export_to_csv.py ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar Python: ${error.message}`);
        reject(error.message);
      } else {
        resolve(stdout);
      }
    });
  });
}

module.exports = { execPython };
