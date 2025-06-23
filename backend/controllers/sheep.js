const { validationResult } = require('express-validator');
const db = require('../model/database');


exports.getSheep = async (req, res, next) => {
    try {
        const data = await db.manyOrNone(
            "SELECT \
                brinco_num, brinco_mae, raca, sexo, finalidade, peso_nascimento, \
                TO_CHAR(data_nascimento, 'DD/MM/YYYY') AS data_nascimento, \
                CASE \
                    WHEN abatido = true THEN 'Sim' ELSE 'Não' \
                END AS abatido \
            FROM ovino;"
        );
        res.status(200).json(data);
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}


exports.getOneSheep = async (req, res, next) => {
    const { brinco } = req.params;
    try {
        const data = await db.manyOrNone(
            "SELECT ovino_brinco, etapa_vida, peso, observacao, \
            TO_CHAR(data_pesagem, 'DD/MM/YYYY') AS data_pesagem \
            FROM pesagem WHERE ovino_brinco = $1;",
            [brinco]
        );
        res.status(201).json(data);
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}


exports.postSheep = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = new Error(result.array()[0].msg)
        error.statusCode = 422;
        throw error;
    }

    try {
        const { brinco_num, raca, sexo, data_nascimento, finalidade, peso_nascimento } = req.body;
        const brinco_mae = (!req.body.comprado) ? req.body.brinco_mae : null;
        const abatido = false;
        await db.none(
            "INSERT INTO ovino(brinco_num, brinco_mae, raca, sexo, peso_nascimento, data_nascimento, finalidade, abatido) \
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",
            [brinco_num, brinco_mae, raca, sexo, peso_nascimento, data_nascimento, finalidade, abatido]
        );
        res.status(201).json({ success: true, message: "Ovino cadastrado com sucesso" });
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}


exports.postWeighIn = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = new Error(result.array()[0].msg)
        error.statusCode = 422;
        throw error;
    }

    try {
        const { brinco_num, etapa_vida, peso, data_pesagem } = req.body;
        let { observacao } = req.body;
        if (!observacao || observacao.length === 0) observacao = null;

        await db.none(
            "INSERT INTO pesagem(ovino_brinco, peso, etapa_vida, data_pesagem, observacao) \
            VALUES ($1, $2, $3, $4, $5);",
            [brinco_num, peso, etapa_vida, data_pesagem, observacao]
        );
        res.status(201).json({ success: true, message: "Pesagem cadastrada com sucesso" });
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}
