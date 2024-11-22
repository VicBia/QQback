const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../config/database"); // Configuração do banco de dados

// Rota para servir a página de login
exports.authLogin = async (req, res) => {
  const { email, user_password } = req.body;

  try {
    // Verifica se o usuário existe no banco de dados
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const usuario = result.rows[0];

    // Verifica se a senha está correta
    const validPassword = await bcrypt.compare(
      user_password,
      usuario.user_password
    );
    if (!validPassword) {
      return res.status(401).json({ message: "Senha inválida!" });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { registration: usuario.registration, email: usuario.email },
      process.env.JWT_SECRET || "seu-segredo",
      { expiresIn: "3h" }
    );

    res.status(200).json({ message: "Login bem-sucedido!", token });
  } catch (erro) {
    console.error(erro);
    res
      .status(500)
      .json({ message: "Erro ao realizar login", error: erro.message });
  }
};
