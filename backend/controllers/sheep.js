const db = require('../model/database');

exports.getSheep = async (req, res, next) => {
    try {
        const data = await db.manyOrNone(
            "SELECT * FROM ovino"
        );
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
    }
}

exports.postSheep = async (req, res, next) => {
    const { num_brinco, raca, sexo, data_nasc, finalidade, peso_nasc, observacao } = req.body;
    const brinco_mae = (req.body.comprado) ? req.body.brinco_mae : null;
    const abatido = false;
    try {
        await db.none(
            "INSERT INTO ovino(num_brinco, brinco_mae, raca, sexo, peso_nasc, data_nasc, finalidade, abatido) \
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",
            [num_brinco, brinco_mae, raca, sexo, peso_nasc, data_nasc, finalidade, abatido]
        );
        res.status(201).json({ success: true });
    } catch (err) {
        console.log(err);
    }
}

exports.postWeighIn = async (req, res, next) => {
    const { num_brinco, etapa, peso, data_pesagem, observacao } = req.body;
    try {
        await db.none(
            "INSERT INTO pesagem(brinco_ovino, peso, etapa_vida, data_pesagem, observacao) \
            VALUES ($1, $2, $3, $4, $5);",
            [num_brinco, peso, etapa, data_pesagem, observacao]
        );
        res.status(201).json({ success: true });
    } catch (err) {
        console.log(err);
    }
}