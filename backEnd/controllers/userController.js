const userService = require("../services/userService");

// Rota para servir a página de cadastro de usuários
exports.listUsers = async (req, res) => {
  try {
    const usuarios = await userService.consultarUsuarios();
    res.status(200).json(usuarios); // Retorna todos os usuários
  } catch (erro) {
    res
      .status(500)
      .json({ message: "Erro ao consultar usuários", error: erro.message });
  }
};

exports.registerUser = async (req, res) => {
  const { registration, user_name, email, user_password, id_store } = req.body;

  try {
    const novoUsuario = await userService.inserirUsuario(
      registration,
      user_name,
      email,
      user_password,
      id_store
    );
    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      usuario: novoUsuario,
    });
  } catch (erro) {
    res
      .status(500)
      .json({ message: "Erro ao cadastrar usuário", error: erro.message });
  }
};

exports.editUser = async (req, res) => {
  const { registration } = req.params;
  const { user_name, email, password, id_store } = req.body;

  try {
    const usuarioAtualizado = await userService.editarUsuario(
      registration,
      user_name,
      email,
      password,
      id_store
    );
    if (usuarioAtualizado) {
      res.status(200).json({
        message: "Usuário atualizado com sucesso!",
        usuario: usuarioAtualizado,
      });
    } else {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (erro) {
    res
      .status(500)
      .json({ message: "Erro ao editar usuário", error: erro.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { registration } = req.params;

  try {
    const usuarioExcluido = await userService.deletarUsuario(registration);
    if (usuarioExcluido) {
      res.status(200).json({
        message: "Usuário excluído com sucesso!",
        usuario: usuarioExcluido,
      });
    } else {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (erro) {
    res
      .status(500)
      .json({ message: "Erro ao excluir usuário", error: erro.message });
  }
};
