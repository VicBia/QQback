const stockService = require("../services/storeService");

// Rota para servir a página de gestão de lojas e consultar todas as lojas
exports.listStore = async (req, res) => {
  try {
    const lojas = await stockService.consultarLojas();
    res.status(200).json(lojas); // Retorna todas as lojas
  } catch (erro) {
    res
      .status(500)
      .json({ message: "Erro ao consultar lojas", error: erro.message });
  }
};

exports.registerStore = async (req, res) => {
  const { store_number, store_name } = req.body;

  try {
    const novaLoja = await stockService.inserirLoja(store_number, store_name);
    res.status(201).json({
      message: "Loja cadastrada com sucesso!",
      loja: novaLoja,
    });
  } catch (erro) {
    res
      .status(500)
      .json({ message: "Erro ao cadastrar loja", error: erro.message });
  }
};

exports.editStore = async (req, res) => {
  const { id_store } = req.params;
  const { store_number, store_name } = req.body;

  try {
    const lojaAtualizada = await stockService.editarLoja(
      id_store,
      store_number,
      store_name
    );
    if (lojaAtualizada) {
      res.status(200).json({
        message: "Loja atualizada com sucesso!",
        loja: lojaAtualizada,
      });
    } else {
      res.status(404).json({ message: "Loja não encontrada." });
    }
  } catch (erro) {
    res
      .status(500)
      .json({ message: "Erro ao editar loja", error: erro.message });
  }
};

exports.deleteStore = async (req, res) => {
  const { id_store } = req.params;

  try {
    const lojaExcluida = await stockService.deletarLoja(id_store);
    if (lojaExcluida) {
      res.status(200).json({
        message: "Loja excluída com sucesso!",
        loja: lojaExcluida,
      });
    } else {
      res.status(404).json({ message: "Loja não encontrada." });
    }
  } catch (erro) {
    res
      .status(500)
      .json({ message: "Erro ao excluir loja", error: erro.message });
  }
};
