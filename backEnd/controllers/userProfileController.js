const userProfileService = require("../services/userProfileService");

// Rota para servir a página de cadastro de associação peril-usuários
exports.listUserProfiles = async (req, res) => {
  try {
    const usuarios = await userProfileService.consultarAssociacao();
    res.status(200).json(usuarios); // Retorna todos os usuários
  } catch (erro) {
    res.status(500).json({
      message: "Erro ao consultar associações",
      error: erro.message,
    });
  }
};

exports.registerUserProfile = async (req, res) => {
  const { registration, id_profile } = req.body;

  try {
    const novoUsuario = await userProfileService.inserirAssociacao(
      registration,
      id_profile
    );
    res.status(201).json({
      message: "Associação cadastrado com sucesso!",
      usuario: novoUsuario,
    });
  } catch (erro) {
    res
      .status(500)
      .json({ message: "Erro ao cadastrar associação", error: erro.message });
  }
};

exports.editUserProfile = async (req, res) => {
  const { registration } = req.params;
  const { id_profile } = req.body;

  try {
    const usuarioAtualizado = await userProfileService.editarAssociacao(
      registration,
      id_profile
    );
    if (usuarioAtualizado) {
      res.status(200).json({
        message: "Associação atualizado com sucesso!",
        usuario: usuarioAtualizado,
      });
    } else {
      res.status(404).json({ message: "Associação não encontrado." });
    }
  } catch (erro) {
    res
      .status(500)
      .json({ message: "Erro ao editar associação", error: erro.message });
  }
};

exports.deleteUserProfile = async (req, res) => {
  const { registration, id_profile } = req.params;

  try {
    const usuarioExcluido = await userProfileService.deletarAssociacao(
      registration,
      id_profile
    );
    if (usuarioExcluido) {
      res.status(200).json({
        message: "Associação excluída com sucesso!",
        usuario: usuarioExcluido,
      });
    } else {
      res.status(404).json({ message: "Associação não encontrada." });
    }
  } catch (erro) {
    res.status(500).json({
      message: "Erro ao excluir associação",
      error: erro.message,
    });
  }
};
