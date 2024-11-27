const { generateToken } = require("../config/jwtConfig");
const { comparePassword } = require("../utils/hashPassword");
const User = require("../models/User");
const cookie = require("cookie");

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
    }

    const validPassword = await comparePassword(
      user_password,
      user.user_password
    );
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }

    // Gerar o token JWT
    const token = generateToken({
      registration: user.registration,
      email: user.email,
    });

    // Salvar o token no cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 10800,
        sameSite: "Strict",
        path: "/",
      })
    );

    console.log("Token gerado com sucesso para o usuário:", user.email);

    // Retornar a resposta de sucesso
    res.status(200).json({
      message: "Login bem-sucedido!",
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

exports.authLogout = (req, res) => {
  // Remover o cookie 'auth_token'
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      sameSite: "Strict",
      path: "/",
    })
  );

  res.status(200).json({ message: "Logout bem-sucedido!" });
};
