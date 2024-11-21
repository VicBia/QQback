const stockService = require("../services/stockService");

// Rota para servir a página de gestão de estoque
exports.listStocks = async (req, res) => {
  try {
    const estoques = await stockService.consultarEstoques();
    res.status(200).json(estoques); // Retorna todos os estoques
  } catch (erro) {
    res
      .status(500)
      .json({ message: "Erro ao consultar estoques", error: erro.message });
  }
};

exports.registerStock = async (req, res) => {
  const { id_store, current_quantity, recommended_quantity, minimum_quantity } =
    req.body;

  try {
    const novaEstoque = await stockService.inserirEstoque(
      id_store,
      current_quantity,
      recommended_quantity,
      minimum_quantity
    );
    res.status(201).json({
      message: "Estoque cadastrado com sucesso!",
      usuario: novaEstoque,
    });
  } catch (erro) {
    res
      .status(500)
      .json({ message: "Erro ao cadastrar estoque", error: erro.message });
  }
};

exports.editStock = async (req, res) => {
  const { id_stock } = req.params;
  const { id_store, current_quantity, recommended_quantity, minimum_quantity } =
    req.body;

  try {
    const estoqueAtualizado = await stockService.editarEstoque(
      id_stock,
      id_store,
      current_quantity,
      recommended_quantity,
      minimum_quantity
    );
    if (estoqueAtualizado) {
      res.status(200).json({
        message: "Estoque atualizado com sucesso!",
        estoque: estoqueAtualizado,
      });
    } else {
      res.status(404).json({ message: "Estoque não encontrado." });
    }
  } catch (erro) {
    res
      .status(500)
      .json({ message: "Erro ao editar estoque", error: erro.message });
  }
};

exports.deleteStock = async (req, res) => {
  const { id_stock } = req.params;

  try {
    const estoqueExcluido = await stockService.deletarEstoque(id_stock);
    if (estoqueExcluido) {
      res.status(200).json({
        message: "Estoque excluído com sucesso!",
        estoque: estoqueExcluido,
      });
    } else {
      res.status(404).json({ message: "Estoque não encontrado." });
    }
  } catch (erro) {
    res
      .status(500)
      .json({ message: "Erro ao excluir estoque", error: erro.message });
  }
};
