const bcrypt = require("bcrypt");

// Função para hash de senha
async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Função para comparar a senha informada com o hash armazenado
async function comparePassword(inputPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
  return isMatch;
}

module.exports = {
  hashPassword,
  comparePassword,
};
