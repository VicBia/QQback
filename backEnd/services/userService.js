const { hashPassword } = require("../utils/hashPassword");
const User = require("../models/User");
const UserProfile = require("../models/UserProfile");
const sequelize = require("../config/database");
const { consultarLojaPorId } = require("./storeService");

// Função para inserir um novo usuário
async function inserirUsuario(
  registration,
  user_name,
  email,
  user_password,
  id_store
) {
  const loja = await consultarLojaPorId(id_store);

  if (!loja) {
    throw new Error(
      "Loja associada não encontrada, usuário não pode ser criado."
    );
  }

  const registration_date = new Date();
  const passwordEncrypted = await hashPassword(user_password);

  try {
    const novoUsuario = await User.create({
      registration,
      user_name,
      email,
      user_password: passwordEncrypted,
      id_store,
      registration_date,
    });

    const baseProfile = 1;
    const associacaoData = new Date();

    // Criar a associação do perfil
    await UserProfile.create({
      registration: novoUsuario.registration,
      id_profile: baseProfile,
      association_date: associacaoData,
    });

    return novoUsuario;
  } catch (erro) {
    console.error("Erro ao inserir usuário:", erro);
    throw erro;
  }
}

// Função para consultar todos os usuários
async function consultarUsuarios() {
  try {
    const usuarios = await User.findAll();
    return usuarios;
  } catch (erro) {
    console.error("Erro ao consultar os usuários:", erro);
    throw erro;
  }
}

// Função para consultar um usuario por ID
async function consultarUsuarioPorId(registration) {
  try {
    const user = await User.findOne({ where: { id: registration } });

    if (!user) {
      throw new Error("Usuario não encontrado.");
    }

    return user; // Retorna o usuario correspondente
  } catch (erro) {
    console.error("Erro ao consultar o usuario:", erro);
    throw erro;
  }
}

// Função para editar um usuário
async function editarUsuario(
  registration,
  user_name,
  email,
  user_password,
  id_store
) {
  const loja = await consultarLojaPorId(id_store);

  if (!loja) {
    throw new Error(
      "Loja associada não encontrada, usuário não pode ser criado."
    );
  }

  const registration_date = new Date();

  try {
    const usuarioAtualizado = await User.update(
      {
        user_name,
        email,
        user_password,
        id_store,
        registration_date,
      },
      {
        where: { registration },
        returning: true,
      }
    );

    return usuarioAtualizado; // Retorna o usuário atualizado
  } catch (erro) {
    console.error("Erro ao editar usuário:", erro);
    throw erro;
  }
}

// Função para excluir um usuário e suas associações
async function deletarUsuario(registration) {
  const t = await sequelize.transaction(); // Inicia uma transação

  try {
    // Exclui as associações da tabela UserProfile
    await UserProfile.destroy({
      where: { registration },
      transaction: t,
    });

    // Exclui o usuário da tabela User
    const usuarioDeletado = await User.destroy({
      where: { registration },
      returning: true,
      transaction: t,
    });

    await t.commit();

    if (usuarioDeletado === 0) {
      return null;
    }
    return usuarioDeletado; // Retorna o usuário excluído
  } catch (erro) {
    await t.rollback();
    console.error("Erro ao excluir usuário e associações:", erro);
    throw erro;
  }
}

module.exports = {
  consultarUsuarios,
  consultarUsuarioPorId,
  inserirUsuario,
  editarUsuario,
  deletarUsuario,
};
