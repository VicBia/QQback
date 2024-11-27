const { generateToken } = require("../config/jwtConfig");
const { comparePassword } = require("../utils/hashPassword");
const User = require("../models/User");

exports.authLogin = async (req, res) => {
  const { email, user_password } = req.body;

  if (!email || !user_password) {
    console.log("Erro: email ou senha não fornecidos.");
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    const user = await User.findOne({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user) {
      console.log("Usuário não encontrado para o email:", email);
      return res.status(404).json({ message: "Usuário não encontrado!" });
    } else {
      console.log("Usuário encontrado:", user);
    }

    const validPassword = await comparePassword(
      user_password,
      user.user_password
    );
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }

    const token = generateToken({
      registration: user.registration,
      email: user.email,
    });

    console.log("Token gerado com sucesso para o usuário:", user.email);

    res.status(200).json({
      message: "Login bem-sucedido!",
      token,
      usuario: {
        registration: user.registration,
        user_name: user.user_name,
        email: user.email,
      },
    });
  } catch (erro) {
    console.error(erro);
    res
      .status(500)
      .json({ message: "Erro ao realizar login", error: erro.message });
  }
};
