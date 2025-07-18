const db = require('../model/database');

exports.getDash = async (req, res, next) => {
  try {

    // Animais por finalidade
    const animaisPorFinalidade = await db.manyOrNone(
      "SELECT finalidade, count(brinco_num) FROM ovino GROUP BY finalidade"
    );

    // Quantidade por raça
    const quantidadePorRaca = await db.manyOrNone(
      "SELECT raca, count(brinco_num) AS total FROM ovino GROUP BY raca"
    );

    // Quantidade por sexo
    const quantidadePorSexo = await db.manyOrNone(`
      SELECT sexo, count(brinco_num) as total 
      FROM ovino 
      GROUP BY sexo
    `);

    // Últimas pesagens
    const ultimasPesagens = await db.manyOrNone(`
      SELECT ovino_brinco, peso, data_pesagem, etapa_vida
      FROM pesagem 
      ORDER BY data_pesagem DESC
      LIMIT 3
    `);

    const tarefasPendentes = await db.manyOrNone(`
      SELECT data_criacao, tarefa_nome, descricao, usuario_email
      FROM tarefa
      ORDER BY data_criacao DESC
      LIMIT 3
    `);

    res.status(201).json({
      animaisPorFinalidade,
      quantidadePorRaca,
      quantidadePorSexo,
      ultimasPesagens,
      tarefasPendentes
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    throw err;
  }
}