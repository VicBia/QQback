const { generateToken } = require("../config/jwtConfig");
const { comparePassword } = require("../utils/hashPassword");
const User = require("../models/User");
const Profile = require("../models/Profile");
const UserProfile = require("../models/UserProfile");
const cookie = require("cookie");

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
      profiles: perfisDoUsuario, // Incluindo as permissões (descrições) no token
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
        profiles: perfisDoUsuario, // Incluindo os perfis no retorno
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
