const { validationResult } = require('express-validator');
const db = require('../model/database');


exports.getSheep = async (req, res, next) => {
    try {
        const data = await db.manyOrNone(
            "SELECT \
                num_brinco, brinco_mae, raca, sexo, finalidade, peso_nasc, \
                TO_CHAR(data_nasc, 'DD/MM/YYYY') AS data_nasc, \
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
            "SELECT brinco_ovino, etapa_vida, peso, observacao, \
            TO_CHAR(data_pesagem, 'DD/MM/YYYY') AS data_pesagem \
            FROM pesagem WHERE brinco_ovino = $1;",
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
        const { num_brinco, raca, sexo, data_nasc, finalidade, peso_nasc } = req.body;
        const brinco_mae = (!req.body.comprado) ? req.body.brinco_mae : null;
        const abatido = false;
        await db.none(
            "INSERT INTO ovino(num_brinco, brinco_mae, raca, sexo, peso_nasc, data_nasc, finalidade, abatido) \
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",
            [num_brinco, brinco_mae, raca, sexo, peso_nasc, data_nasc, finalidade, abatido]
        );
        res.status(201).json({ success: true });
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
        const { num_brinco, etapa, peso, data_pesagem, observacao } = req.body;
        await db.none(
            "INSERT INTO pesagem(brinco_ovino, peso, etapa_vida, data_pesagem, observacao) \
            VALUES ($1, $2, $3, $4, $5);",
            [num_brinco, peso, etapa, data_pesagem, observacao]
        );
        res.status(201).json({ success: true });
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}
