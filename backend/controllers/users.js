const db = require('../model/database');

exports.getUsers = async (req, res, next) => {
    try {
        const data = await db.manyOrNone('select * from usuario;');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
    }
}


exports.createUser = async (req, res, next) => {
    try {
        const { nome, email, grupo, senha, data_cadastro } = req.body;
        await db.none(
            "INSERT INTO usuario(email, nome, senha, grupo, data_cadastro) \
            VALUES ($1, $2, $3, $4, $5)",
            [email, nome, senha, grupo, data_cadastro]
        );
        res.status(201).json({success: true});
    } catch (err) {
        console.log(err);
    } 
}


exports.getUser = async (req, res, next) => {
    const { email } = req.params;
    try {
        const data = await db.one('select * from usuario where email = $1;', [email]);
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
    }
}
