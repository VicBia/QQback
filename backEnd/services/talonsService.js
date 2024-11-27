const Talons = require("../models/Talons");
const Transaction = require("../models/Transaction");

// Função para inserir uma nova solicitação (talão)
async function inserirSolicitacao(
  id_store,
  talon_quantity,
  requester_registration
) {
  try {
    const novaSolicitacao = await Talons.create({
      id_store,
      talon_quantity,
      requester_registration,
    });

    await Transaction.create({
      id_talon: novaSolicitacao.id_talon,
      status: "requested",
    });

    return novaSolicitacao; // Retorna a solicitação inserida
  } catch (erro) {
    console.error("Erro ao inserir solicitação:", erro);
    throw erro;
  }
}

// Função para consultar todos os talões
async function consultarTaloes() {
  try {
    const taloes = await Talons.findAll();
    return taloes; // Retorna todos os talões
  } catch (erro) {
    console.error("Erro ao consultar os talões:", erro);
    throw erro;
  }
}

// Função para editar um talão
async function editarTalao(
  id_talon,
  talon_quantity,
  requester_registration,
  id_store
) {
  try {
    // Atualizar o talão
    const talaoAtualizado = await Talons.update(
      {
        talon_quantity,
        requester_registration,
        id_store,
      },
      {
        where: { id_talon },
        returning: true,
      }
    );

    if (talaoAtualizado[0] === 0) {
      return null;
    }

    return talaoAtualizado; // Retorna o talão atualizado
  } catch (erro) {
    console.error("Erro ao editar talão:", erro);
    throw erro;
  }
}

// Função para excluir um talão
async function deletarTalao(id_talon) {
  try {
    // Deletar o talão
    const talaoDeletado = await Talons.destroy({
      where: { id_talon },
      returning: true,
    });

    if (talaoDeletado === 0) {
      return null;
    }

    await Transaction.destroy({
      where: { id_talon },
    });

    return talaoDeletado; // Retorna o talão excluído
  } catch (erro) {
    console.error("Erro ao excluir talão:", erro);
    throw erro;
  }
}

module.exports = {
  inserirSolicitacao,
  consultarTaloes,
  editarTalao,
  deletarTalao,
};
