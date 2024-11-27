const Profile = require("../models/Profile");

// Função para inserir um novo perfil
async function inserirPerfil(profile_name, description) {
  try {
    const novoPerfil = await Profile.create({ profile_name, description });
    return novoPerfil; // Retorna o perfil inserido
  } catch (error) {
    console.error("Erro ao inserir perfil:", error);
    throw error;
  }
}

// Função para consultar todos os perfils
async function consultarPerfis() {
  try {
    const perfis = await Profile.findAll();
    return perfis; // Retorna todos os perfils
  } catch (erro) {
    console.error("Erro ao consultar os perfis:", erro);
    throw erro;
  }
}

// Função para editar um perfil
async function editarPerfil(id_profile, profile_name, description) {
  if (!id_profile) {
    throw new Error("id_profile é obrigatório.");
  }

  try {
    const perfilAtualizado = await Profile.update(
      {
        profile_name,
        description,
      },
      {
        where: { id_profile },
        returning: true,
      }
    );

    return perfilAtualizado; // Retorna o perfil
  } catch (erro) {
    console.error("Erro ao editar perfil:", erro);
    throw erro;
  }
}

// Função para excluir um perfil
async function deletarPerfil(id_profile) {
  try {
    const deleted = await Profile.destroy({
      where: { id_profile },
    });

    return deleted === 1;
  } catch (erro) {
    console.error("Erro ao deletar perfil:", erro);
    throw erro;
  }
}

module.exports = {
  inserirPerfil,
  consultarPerfis,
  editarPerfil,
  deletarPerfil,
};
