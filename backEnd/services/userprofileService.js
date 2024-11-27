const UserProfile = require("../models/UserProfile");

// Função para inserir uma nova associação
async function inserirAssociacao(registration, id_profile) {
  // Captura a data e hora atual
  const association_date = new Date();

  try {
    const novaAssociacao = await UserProfile.create({
      registration,
      id_profile,
      association_date,
    });

    return novaAssociacao; // Retorna a nova associação criada
  } catch (erro) {
    console.error("Erro ao inserir associação:", erro);
    throw erro;
  }
}

// Função para consultar todas as associações
async function consultarAssociacao() {
  try {
    const associacoes = await UserProfile.findAll();
    return associacoes; // Retorna todas as associações
  } catch (erro) {
    console.error("Erro ao consultar as associações:", erro);
    throw erro;
  }
}

// Função para editar uma associação
async function editarAssociacao(registration, id_profile) {
  const association_date = new Date();

  try {
    const [updated] = await UserProfile.update(
      {
        id_profile,
        association_date,
      },
      {
        where: { registration },
        returning: true,
      }
    );

    if (updated) {
      const associacaoAtualizada = await UserProfile.findOne({
        where: { registration },
      });
      return associacaoAtualizada; // Retorna a associação atualizada
    }
    throw new Error("Associação não encontrada");
  } catch (erro) {
    console.error("Erro ao editar associação:", erro);
    throw erro;
  }
}

// Função para excluir uma associação
async function deletarAssociacao(registration, id_profile) {
  try {
    const deleted = await UserProfile.destroy({
      where: { registration, id_profile },
    });

    return deleted ? { registration, id_profile } : null;
  } catch (erro) {
    console.error("Erro ao excluir associação:", erro);
    throw erro;
  }
}

module.exports = {
  consultarAssociacao,
  inserirAssociacao,
  editarAssociacao,
  deletarAssociacao,
};
