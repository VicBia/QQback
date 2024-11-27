const Store = require("../models/Store");

// Função para inserir uma nova loja
async function inserirLoja(store_number, store_name) {
  try {
    const novaLoja = await Store.create({
      store_number,
      store_name,
    });
    return novaLoja; // Retorna a loja inserida
  } catch (erro) {
    console.error("Erro ao inserir loja:", erro);
    throw erro;
  }
}

// Função para consultar todas as lojas
async function consultarLojas() {
  try {
    const lojas = await Store.findAll();
    return lojas; // Retorna todas as lojas
  } catch (erro) {
    console.error("Erro ao consultar as lojas:", erro);
    throw erro;
  }
}

// Função para editar uma loja
async function editarLoja(id_store, store_number, store_name) {
  try {
    const lojaAtualizada = await Store.update(
      {
        store_number,
        store_name,
      },
      {
        where: { id_store },
        returning: true,
      }
    );

    return lojaAtualizada; // Retorna a loja atualizada
  } catch (erro) {
    console.error("Erro ao editar loja:", erro);
    throw erro;
  }
}

// Função para excluir uma loja
async function deletarLoja(id_store) {
  try {
    const deleted = await Store.destroy({
      where: { id_store },
    });

    return deleted === 1;
  } catch (erro) {
    console.error("Erro ao deletar loja:", erro);
    throw erro;
  }
}

module.exports = { inserirLoja, consultarLojas, editarLoja, deletarLoja };
