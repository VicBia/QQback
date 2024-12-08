const { generateToken, verifyToken } = require("../config/jwtConfig");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const User = require("../models/User");
const Profile = require("../models/Profile");
const cookie = require("cookie");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
dotenv.config();

exports.authLogin = async (req, res) => {
  const { email, user_password } = req.body;

  if (!email || !user_password) {
    console.log("Erro: email ou senha não fornecidos.");
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    // Busca o usuário no banco
    const user = await User.findOne({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user) {
      console.log("Usuário não encontrado para o email:", email);
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    // Verifica a senha
    const validPassword = await comparePassword(
      user_password,
      user.user_password
    );
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }

    // Busca os perfis associados ao usuário
    const userProfiles = await User.findAll({
      where: { registration: user.registration },
      include: {
        model: Profile,
        as: "profiles",
        attributes: ["id_profile", "profile_name", "description"],
      },
    });

    // Verifique se userProfiles contém perfis
    if (!userProfiles || userProfiles.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum perfil encontrado para o usuário." });
    }

    console.log("Perfis do usuário:", userProfiles);

    // Extrai as descrições dos perfis do usuário
    const perfisDoUsuario = userProfiles
      .map((userProfile) =>
        userProfile.profiles.map((profile) => profile.description)
      )
      .flat(2);

    // Gera o token JWT com as permissões do usuário (descrições dos perfis)
    const token = generateToken({
      registration: user.registration,
      email: user.email,
      profiles: perfisDoUsuario,
    });

    // Salvar o token no cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 10800, // 3 horas
        sameSite: "Strict",
        path: "/",
      })
    );

    console.log("Token gerado com sucesso para o usuário:", user.email);

    // Retornar a resposta de sucesso com os detalhes do usuário
    res.status(200).json({
      message: "Login bem-sucedido!",
      usuario: {
        registration: user.registration,
        user_name: user.user_name,
        email: user.email,
        profiles: perfisDoUsuario,
      },
    });
  } catch (erro) {
    console.error("Erro ao realizar login:", erro);
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
      maxAge: 0, // Exclui o cookie
      sameSite: "Strict",
      path: "/",
    })
  );

  res.status(200).json({ message: "Logout bem-sucedido!" });
};

// Função forgotPassword - Envia um e-mail com o token de redefinição de senha
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email é obrigatório." });
  }

  try {
    // Busca o usuário pelo e-mail
    const user = await User.findOne({
      where: { email: email.trim().toLowerCase() },
    });
    console.log("passou aqui");
    if (!user) {
      return res
        .status(404)
        .json({ error: "Não existe um usuário com esse email." });
    }

    // Gera um token de redefinição de senha com validade de 1 hora
    const resetToken = generateToken({ email: user.email }, "1h");

    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASS);

    // Envia o token por e-mail (exemplo simples usando nodemailer)
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use seu serviço de e-mail
      auth: {
        user: process.env.EMAIL_USER, // Seu e-mail
        pass: process.env.EMAIL_PASS, // Sua senha
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Redefinição de senha",
      text: `Você solicitou a redefinição de senha. Clique no link abaixo para redefinir sua senha:\n\n${process.env.FRONTEND_URL}/token_senha?token=${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erro ao enviar o e-mail:", error);
        return res
          .status(500)
          .json({ error: "Erro ao enviar o e-mail de redefinição." });
      } else {
        console.log("E-mail enviado:", info.response);
        return res.status(200).json({
          message: "E-mail de redefinição de senha enviado com sucesso.",
        });
      }
    });
  } catch (err) {
    console.error("Erro no processo de esquecimento de senha:", err);
    res
      .status(500)
      .json({ error: "Erro no processo de redefinição de senha." });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.query; // Pega o token da URL
  const { password } = req.body; // Pega a nova senha do corpo da requisição

  if (!token) {
    return res.status(400).json({ error: "Token ausente." });
  }

  if (!password) {
    return res.status(400).json({ error: "A senha não foi fornecida." });
  }

  try {
    // Verificar o token (com base na sua chave secreta)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Encontrar o usuário com base no e-mail do token
    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado." });
    }

    // Atual2izar a senha (garanta que a senha será corretamente criptografada, se necessário)
    user.password = password; // Se você estiver usando bcrypt, aplique o hash aqui
    await user.save();

    return res.status(200).json({ message: "Senha redefinida com sucesso." });
  } catch (error) {
    console.error("Erro ao validar o token ou atualizar a senha:", error);
    return res
      .status(500)
      .json({ error: "Erro ao processar a redefinição de senha." });
  }
};
