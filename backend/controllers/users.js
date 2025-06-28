const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../model/database');


const SALT_ROUNDS = 12;


exports.getUsers = async (req, res, next) => {
    const filterProps = req.query;
    console.log(filterProps);

    try {
        const data = await db.manyOrNone(
            "SELECT \
                nome, email, grupo_nome, TO_CHAR(data_cadastro, 'DD/MM/YYYY') AS data_cadastro \
            FROM usuario;"
        );
        res.status(200).json(data);
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}


exports.createUser = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = new Error(result.array()[0].msg)
        error.statusCode = 422;
        throw error;
    }

    try {
        const { nome, email, grupo_nome, senha, data_cadastro } = req.body;
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(senha, salt);
        await db.none(
            "INSERT INTO usuario(email, nome, senha, grupo_nome, data_cadastro) \
            VALUES ($1, $2, $3, $4, $5);",
            [email, nome, hashedPassword, grupo_nome, data_cadastro]
        );
        res.status(201).json({ success: true, message: "Usuário criado com sucesso" });
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}


exports.getUser = async (req, res, next) => {
    const { email } = req.params;
    try {
        const data = await db.one(
            "SELECT * FROM usuario WHERE email = $1;",
            [email]
        );
        res.status(200).json(data);
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}
