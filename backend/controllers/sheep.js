const { validationResult } = require('express-validator');
const db = require('../model/database');
const { getPagesAndClearData } = require('../util/db-util');

// mapeia um tipo de entrada para uma condição WHERE
const queryWhereOperators = {
    abatido: '='
};


exports.getSheep = async (req, res, next) => {
    const filters = (Object.entries(req.query)).filter(param => param[0] !== 'page');
    const page = req.query.page || 1;
    const MAX_PER_PAGE = 12;
    const offset = (page - 1) * MAX_PER_PAGE;

    const queryArgs = [MAX_PER_PAGE, offset];
    let query = `
        SELECT
            ov.brinco_num, ov.brinco_mae, ov.raca, ov.sexo, ov.finalidade, ov.peso_nascimento,
            TO_CHAR(ov.data_nascimento, 'DD/MM/YYYY') AS data_nascimento,
            CASE
                WHEN abatido = true THEN 'Sim' ELSE 'Não'
            END AS abatido,
            COUNT(*) OVER() AS row_count
        FROM ovino AS ov
        `;
    const queryEnd = ' LIMIT $1 OFFSET $2;';

    if (filters.length > 0) {
        query += 'WHERE ';
        const conditions = filters.map(([col, value]) => {
            const varNumber = queryArgs.length + 1;
            queryArgs.push(col, value);
            const operator = queryWhereOperators[col] || 'ILIKE';
            const conditionStart = `$${varNumber}:name ${operator} `;
            const conditionEnd = (operator === 'ILIKE') ? `'%$${varNumber + 1}#%'` : `$${varNumber + 1}`;
            return conditionStart + conditionEnd;
        });
        query += conditions.join(' AND ');
    }

    query += queryEnd;

    console.log(query);

    try {
        const data = await db.manyOrNone(query, queryArgs);
        const finalData = getPagesAndClearData(data, MAX_PER_PAGE, 'sheep');
        res.status(200).json({ success: true, ...finalData });
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}


exports.getSingleSheepData = async (req, res, next) => {
    const { brinco } = req.params;
    try {
        const data = await db.manyOrNone(
            "SELECT \
                ov.brinco_num AS ovino_brinco, \
                'Nascimento' AS etapa_vida, \
                ov.peso_nascimento AS peso, \
                NULL as observacao, \
                TO_CHAR(ov.data_nascimento, 'DD/MM/YYYY') AS data_pesagem \
            FROM ovino AS ov \
            WHERE ov.brinco_num = $1 \
            UNION \
            SELECT ovino_brinco, etapa_vida, peso, observacao, \
            TO_CHAR(data_pesagem, 'DD/MM/YYYY') AS data_pesagem \
            FROM pesagem WHERE ovino_brinco = $1;",
            brinco
        );

        if (data.length === 0) {
            const error = new Error('Ovino não encontrado');
            error.statusCode = 400;
            throw error;
        }

        res.status(201).json(data);
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}


exports.getSingleSheep = async (req, res, next) => {
    const { brinco } = req.params;
    try {
        const sheep = await db.oneOrNone(
            `SELECT
                ov.brinco_num, ov.brinco_mae, ov.raca, ov.sexo, ov.finalidade, ov.peso_nascimento,
                TO_CHAR(ov.data_nascimento, 'DD/MM/YYYY') AS data_nascimento,
                CASE
                    WHEN abatido = true THEN 'Sim' ELSE 'Não'
                END AS abatido
            FROM ovino AS ov
            WHERE ov.brinco_num = $1;`,
            brinco);

        if (!sheep) {
            const error = new Error('Ovino não encontrado');
            error.statusCode = 400;
            throw error;
        }

        res.status(200).json({ success: true, sheep });
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
        const { brinco_num, usuario_email, raca, sexo, data_nascimento, finalidade, peso_nascimento } = req.body;
        const brinco_mae = (!req.body.comprado) ? req.body.brinco_mae : null;
        const abatido = false;
        await db.none(
            "INSERT INTO ovino(brinco_num, brinco_mae, usuario_email, raca, sexo, peso_nascimento, data_nascimento, finalidade, abatido) \
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);",
            [brinco_num, brinco_mae, usuario_email, raca, sexo, peso_nascimento, data_nascimento, finalidade, abatido]
        );
        res.status(201).json({ success: true, message: "Ovino cadastrado com sucesso" });
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}


exports.putSheep = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg)
        error.statusCode = 422;
        throw error;
    }

    try {
        const { brinco_num: novo_brinco, raca, sexo, data_nascimento, finalidade, peso_nascimento, abatido } = req.body;
        const brinco_mae = (!req.body.comprado) ? req.body.brinco_mae : null;
        const { brinco: antigo_brinco } = req.params;
        await db.none(`
            UPDATE ovino
            SET
            brinco_num = $1,
            brinco_mae = $2,
            raca = $3,
            sexo = $4,
            peso_nascimento = $5,
            data_nascimento = $6,
            finalidade = $7,
            abatido = $8
            WHERE brinco_num = $9;`,
            [novo_brinco, brinco_mae, raca, sexo, peso_nascimento, data_nascimento, finalidade, abatido, antigo_brinco]
        );
        res.status(200).json({ success: true, message: "Ovino editado com sucesso" });
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}


exports.deleteSheep = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.statusCode = 422;
        throw error;
    }

    try {
        const { brinco } = req.params;
        await db.none(' \
            DELETE FROM ovino \
            WHERE ovino.brinco_num = $1;',
            [brinco]);
        res.status(200).json({ success: true, message: 'Ovino excluído com sucesso' });
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


exports.deleteWeighIn = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = new Error(result.array()[0].msg)
        error.statusCode = 422;
        throw error;
    }

    try {
        const { brinco, data } = req.params;
        const [date, month, year] = data.split('-');
        const formattedDate = [year, month, date].join('-');

        await db.none(
            "DELETE FROM pesagem \
            WHERE ovino_brinco = $1 \
            AND data_pesagem = $2;",
            [brinco, formattedDate]
        );
        res.status(201).json({ success: true, message: "Pesagem excluída com sucesso" });
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}