const { validationResult } = require('express-validator');
const db = require('../model/database');

exports.getTarefas = async (req, res, next) => {
    try {
      const data = await db.manyOrNone(
        `SELECT *, TO_CHAR(data_criacao, 'YYYY-MM-DD') AS data_criacao_formatada FROM tarefa;`
      );
      const dataFormatada = data.map(evento => ({
        ...evento,
        data_criacao: evento.data_criacao_formatada
      }));
      res.status(200).json(dataFormatada);
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}

exports.postTarefas = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = new Error(result.array()[0].msg);
        error.statusCode = 422;
        throw error;
    }
    try {
        const { data_criacao, tarefa_nome, usuario_email } = req.body;
        let descricao = req.body.tarefa_descricao || null;
        await db.none(
            "INSERT INTO tarefa (data_criacao, tarefa_nome, descricao, usuario_email) VALUES ($1, $2, $3, $4)",
            [data_criacao, tarefa_nome, descricao, usuario_email]
        );
        res.status(201).json({ success: true, message: "Tarefa criada com sucesso" });
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}