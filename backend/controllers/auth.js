const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const db = require('../model/database');


const SALT_ROUNDS = 12;


exports.postStartAccount = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = new Error(result.array()[0].msg)
    error.statusCode = 422;
    throw error;
  }

  try {
    const { nome, email, senha, data_cadastro } = req.body;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(senha, salt);
    await db.none(
      "INSERT INTO usuario(email, nome, senha, grupo, data_cadastro) \
            VALUES ($1, $2, $3, $4, $5);",
      [email, nome, hashedPassword, "Administrador", data_cadastro]
    );
    res.status(201).json({ success: true });
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

    // terminar login...
    res.json({ success: true });

  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
}