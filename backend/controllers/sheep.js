const db = require('../model/database');

exports.getSheep = async (req, res, next) => {
    try {
        const data = await db.manyOrNone('SELECT * FROM ovino');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
    }
}

exports.postSheep = async (req, res, next) => {
    const { num_brinco, raca, sexo, data_nasc, finalidade, peso_nasc, observacao } = req.body;
    const brinco_mae = (req.body.comprado) ? req.body.brinco_mae : null;
    const abatido = false;
    // fazer o insert no banco...
}
