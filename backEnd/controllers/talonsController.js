const talonsService = require("../services/talonsService");

// Rota para servir a página de gestão de talões
exports.listTalons = async (req, res) => {
  try {
    const taloes = await talonsService.consultarTaloes();
    res.status(200).json(taloes); // Retorna todas as solicitações de talões
  } catch (erro) {
    res
      .status(500)
      .json({ message: "Erro ao consultar talões", error: erro.message });
  }
};

exports.registerTalon = async (req, res) => {
  const { id_store, talon_quantity, requester_registration } = req.body;

  try {
    const novaSolicitacao = await talonsService.inserirSolicitacao(
      id_store,
      talon_quantity,
      requester_registration
    );
    res.status(201).json({
      message: "Solicitação cadastrada com sucesso!",
      solicitacao: novaSolicitacao, // Renomeado para refletir melhor o objeto retornado
    });
  } catch (erro) {
    res.status(500).json({
      message: "Erro ao cadastrar solicitação",
      error: erro.message,
    });
  }
};

exports.editTalon = async (req, res) => {
  const { id_talon } = req.params;
  const { talon_quantity, requester_registration, id_store } = req.body;

  try {
    const talaoAtualizado = await talonsService.editarTalao(
      id_talon,
      talon_quantity,
      requester_registration,
      id_store
    );
    if (talaoAtualizado) {
      res.status(200).json({
        message: "Talão atualizado com sucesso!",
        talao: talaoAtualizado,
      });
    } else {
      res.status(404).json({ message: "Talão não encontrado." });
    }
  } catch (erro) {
    res
      .status(500)
      .json({ message: "Erro ao editar talão", error: erro.message });
  }
};

exports.deleteTalon = async (req, res) => {
  const { id_talon } = req.params;

  try {
    const talaoExcluido = await talonsService.deletarTalao(id_talon);
    if (talaoExcluido) {
      res.status(200).json({
        message: "Talão excluído com sucesso!",
        talao: talaoExcluido,
      });
    } else {
      res.status(404).json({ message: "Talão não encontrado." });
    }
  } catch (erro) {
    res
      .status(500)
      .json({ message: "Erro ao excluir talão", error: erro.message });
  }
};
