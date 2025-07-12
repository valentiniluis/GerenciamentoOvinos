const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../model/database');
require('dotenv').config();

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);


// queryArgs[0] corresponde à query
// queryArgs[1] são os valores para os filtros que serão aplicados, se houverem

exports.getUsers = async (req, res, next) => {
    const page = req.query.page || 1;
    const MAX_PER_PAGE = 10;
    const queryArgs = [
        "SELECT us.nome, us.email, us.grupo_nome, TO_CHAR(us.data_cadastro, 'DD/MM/YYYY') AS data_cadastro \
        FROM usuario AS us"
    ];
    const filterProps = req.query;
    const filters = Object.entries(filterProps).filter(([key]) => key !== 'page');
    if (filters.length > 0) {
        queryArgs[0] += " WHERE $1:name ILIKE '%$2#%';";
        queryArgs.push(filters[0]);
    }
    else queryArgs[0] += ';';

    try {
        const data = await db.manyOrNone(...queryArgs);
        const totalRows = data.length;
        const startIndex = (page - 1) * MAX_PER_PAGE;
        const endIndex = startIndex + MAX_PER_PAGE;
        const paginatedData = data.slice(startIndex, endIndex);
        const totalPages = Math.ceil(totalRows / MAX_PER_PAGE);
        res.status(200).json({ users: paginatedData, pages: totalPages });
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
        const data_cadastro = new Date().toISOString().split('T')[0];
        const { nome, email, grupo_nome, senha } = req.body;
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


exports.putUser = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = new Error(result.array()[0].msg)
        error.statusCode = 422;
        throw error;
    }

    try {
        const { email: antigo_email } = req.params;
        const { nome, email: novo_email, grupo_nome } = req.body;
        await db.none(
            "UPDATE usuario \
            SET \
            email = $1, \
            nome = $2, \
            grupo_nome = $3 \
            WHERE email = $4;",
            [novo_email, nome, grupo_nome, antigo_email]
        );
        res.status(201).json({ success: true, message: "Usuário atualizado com sucesso" });
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}


exports.deleteUser = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = new Error(result.array()[0].msg)
        error.statusCode = 422;
        throw error;
    }

    try {
        const { email } = req.params;
        await db.none("DELETE FROM usuario WHERE usuario.email = $1;", email);
        res.status(200).json({ success: true, message: "Usuário excluído com sucesso" });
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
