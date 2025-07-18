const { validationResult } = require('express-validator');
const db = require('../model/database');

// mapeia um tipo de entrada para uma condição WHERE
const queryWhereOperators = {
    abatido: '='
};


exports.getSheep = async (req, res, next) => {
    const page = req.query.page || 1;
    const MAX_PER_PAGE = 12;
    const queryArgs = [
        "SELECT \
            ov.brinco_num, ov.brinco_mae, ov.raca, ov.sexo, ov.finalidade, ov.peso_nascimento, \
            TO_CHAR(ov.data_nascimento, 'DD/MM/YYYY') AS data_nascimento, \
            CASE \
                WHEN abatido = true THEN 'Sim' ELSE 'Não' \
            END AS abatido \
        FROM ovino AS ov"
    ];
    const filterProps = req.query;
    const filters = (Object.entries(filterProps)).filter(param => param[0] !== 'page');
    if (filters.length > 0) {
        let queryValues = [];
        queryArgs[0] += ' WHERE ';
        const conditions = filters.map((keyValuePair, index) => {
            const firstVariableNumber = (index * 2) + 1;
            queryValues = queryValues.concat(keyValuePair);
            const column = keyValuePair[0];
            const operator = queryWhereOperators[column] || 'ILIKE';
            let value = `$${firstVariableNumber + 1}`;
            if (operator === 'ILIKE') value = `'%${value}#%'`
            return `$${firstVariableNumber}:name ${operator} ${value}`;
        });
        queryArgs[0] += conditions.join(' AND ');
        queryArgs.push(queryValues);
    }
    queryArgs[0] += ';';
    try {
        const data = await db.manyOrNone(...queryArgs);
        const totalRows = data.length;
        const startIndex = (page - 1) * MAX_PER_PAGE;
        const endIndex = startIndex + MAX_PER_PAGE;
        const paginatedData = data.slice(startIndex, endIndex);
        const totalPages = Math.ceil(totalRows / MAX_PER_PAGE);
        res.status(200).json({ sheep: paginatedData, pages: totalPages });
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}


exports.getOneSheep = async (req, res, next) => {
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
        await db.none(
            "UPDATE ovino \
            SET \
            brinco_num = $1, \
            brinco_mae = $2, \
            raca = $3, \
            sexo = $4, \
            peso_nascimento = $5, \
            data_nascimento = $6, \
            finalidade = $7, \
            abatido = $8 \
            WHERE brinco_num = $9;",
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
        res.status(200).json({ message: 'Ovino excluído com sucesso' });
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