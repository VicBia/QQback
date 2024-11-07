const pool = require("../config/database");

// Função para atualizar o campo remessa no talão e inserir uma nova transação de envio
async function inserirEnvio(
  tempo_previsto,
  envio_transacao,
  id_talao
) {

  const queryInsert = `
        INSERT INTO transacoes (tempo_previsto, envio_transacao, id_talao)
        VALUES (($2::timestamp, $2::timestamp, $4)
        RETURNING *;
    `;

  const valores = [tempo_previsto, envio_transacao, id_talao];

  try {
    // Executar o INSERT da transação de envio
    const resultado = await pool.query(queryInsert, [
      tempo_previsto,
      envio_transacao,
      id_talao,
    ]);

    return resultado.rows[0]; // Retorna a transação inserida
  } catch (erro) {
    console.error("Erro ao inserir solicitação:", erro);
    throw erro;
  }
}

module.exports = { inserirEnvio };
