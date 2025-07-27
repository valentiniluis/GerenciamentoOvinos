const { validationResult } = require('express-validator');
const db = require('../model/database');

exports.getTasks = async (req, res, next) => {
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

exports.postTask = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = new Error(result.array()[0].msg);
        error.statusCode = 422;
        throw error;
    }
    try {
        const { data_criacao, tarefa_nome, usuario_email } = req.body;
        let descricao = req.body.descricao || null;
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

exports.putTask = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = new Error(result.array()[0].msg);
        error.statusCode = 422;
        throw error;
    }
    try {
        const { tarefa_nome_original, tarefa_nome, descricao, data_criacao, usuario_email } = req.body;
        await db.none(
            `
            UPDATE tarefa
            SET 
            tarefa_nome = $1, 
            descricao = $2
            WHERE 
            usuario_email = $3 AND 
            tarefa_nome = $4 AND 
            data_criacao = $5;`,
            [tarefa_nome, descricao, usuario_email, tarefa_nome_original, data_criacao]
        );
        res.status(200).json({ success: true, message: "Tarefa atualizada com sucesso" });
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}


exports.deleteTask = async (req, res, next) => {
    try {
        const { title, date } = req.params;
        await db.none(`
            DELETE FROM
            tarefa
            WHERE
            tarefa_nome = $1 AND
            data_criacao = $2;`, 
            [title, date]
        );
        res.status(200).json({ success: true, message: 'Tarefa excluída com sucesso' });
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}