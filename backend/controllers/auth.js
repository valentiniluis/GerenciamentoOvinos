const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const db = require('../model/database');
const { getPermissions } = require('../util/db-util');
require('dotenv').config();

const SALT_ROUNDS = process.env.SALT_ROUNDS;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE_TIME = process.env.JWT_EXPIRE_TIME;


exports.postStartAccount = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = new Error(result.array()[0].msg)
    error.statusCode = 422;
    throw error;
  }

  try {
    const data_cadastro = new Date().toISOString().split('T')[0];
    const { nome, email, senha } = req.body;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(senha, salt);
    await db.none(
      "INSERT INTO usuario(email, nome, senha, grupo_nome, data_cadastro) \
            VALUES ($1, $2, $3, $4, $5);",
      [email, nome, hashedPassword, "Administrador", data_cadastro]
    );
    res.status(201).json({ success: true, message: 'Conta criada com sucesso' });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    throw err;
  }
}


exports.postLogin = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = new Error(result.array()[0].msg)
    error.statusCode = 422;
    throw error;
  }

  try {
    const { email, senha } = req.body;
    const userData = await db.oneOrNone('SELECT email, senha FROM usuario WHERE email = $1;', email);

    let match = false;
    if (userData) {
      const hashedPassword = userData.senha;
      match = await bcrypt.compare(senha, hashedPassword);
    }

    if (!userData || !match) {
      const error = new Error('E-mail ou senha incorreto(s)');
      error.statusCode = 422;
      throw error;
    }

    const token = jwt.sign(
      { email: userData.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE_TIME }
    );

    res.status(200).json({ success: true, token, expiration: JWT_EXPIRE_TIME, userEmail: userData.email });

  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
}


exports.getUserPermissions = async (req, res, next) => {
  // usamos as informações extraídas do usuário depois de checar se seu jwt é valido
  // (extraído por meio do middleware isAuth)
  try {
    const { userEmail } = req;
    const result = await getPermissions(userEmail);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
}