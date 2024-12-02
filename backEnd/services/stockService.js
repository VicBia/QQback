const Stock = require("../models/Stock");
const { consultarLojaPorId } = require("./storeService");

// Função para inserir um novo estoque
async function inserirEstoque(
  id_store,
  current_quantity,
  recommended_quantity,
  minimum_quantity
) {
  const loja = await consultarLojaPorId(id_store);

  if (!loja) {
    throw new Error(
      "Loja associada não encontrada, usuário não pode ser criado."
    );
  }

  try {
    // Inserir na tabela stock
    const novoEstoque = await Stock.create({
      id_store,
      current_quantity,
      recommended_quantity,
      minimum_quantity,
    });

    return novoEstoque; // Retorna o estoque inserido
  } catch (erro) {
    console.error("Erro ao inserir estoque:", erro);
    throw erro;
  }
}

// Função para consultar todos os estoques
async function consultarEstoques() {
  try {
    const estoques = await Stock.findAll();
    return estoques; // Retorna todos os estoques
  } catch (erro) {
    console.error("Erro ao consultar os estoques:", erro);
    throw erro;
  }
}

// Função para editar um estoque
async function editarEstoque(
  id_stock,
  id_store,
  current_quantity,
  recommended_quantity,
  minimum_quantity
) {
  const loja = await consultarLojaPorId(id_store);

  if (!loja) {
    throw new Error(
      "Loja associada não encontrada, usuário não pode ser criado."
    );
  }

  try {
    const estoqueAtualizado = await Stock.update(
      {
        id_store,
        current_quantity,
        recommended_quantity,
        minimum_quantity,
      },
      {
        where: { id_stock },
        returning: true, // Retorna o estoque atualizado
      }
    );

    if (estoqueAtualizado[0] === 0) {
      return null;
    }

    return estoqueAtualizado; // Retorna o estoque atualizado
  } catch (erro) {
    console.error("Erro ao editar estoque:", erro);
    throw erro;
  }
}

// Função para excluir um estoque
async function deletarEstoque(id_stock) {
  try {
    const estoqueDeletado = await Stock.destroy({
      where: { id_stock },
      returning: true,
    });

    if (estoqueDeletado === 0) {
      return null;
    }

    return estoqueDeletado; // Retorna o estoque excluído
  } catch (erro) {
    console.error("Erro ao excluir estoque:", erro);
    throw erro;
  }
}

module.exports = {
  inserirEstoque,
  consultarEstoques,
  editarEstoque,
  deletarEstoque,
};
