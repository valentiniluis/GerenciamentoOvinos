const { body } = require('express-validator');
const config = require('./validation-config');
const db = require('../model/database');


exports.validateEmail = (fieldName) => {
  return body(fieldName, 'Insira um e-mail válido, por favor.')
    .trim()
    .isEmail()
    .normalizeEmail();
}


exports.checkUserNotExists = (fieldName) => {
  return body(fieldName)
    .custom(async (value) => {
      return await db.none('SELECT email FROM usuario WHERE email = $1', value);
    })
    .withMessage('O e-mail inserido já está em uso')
}


exports.validateName = (fieldName) => {
  return body(fieldName)
    .isString()
    .withMessage('O nome deve ser uma sequência de caracteres')
    .trim()
    .isLength({
      min: config.MIN_NAME_LENGTH,
      max: config.MAX_NAME_LENGTH
    })
    .withMessage(`O nome deve ter de ${config.MIN_NAME_LENGTH} até ${config.MAX_NAME_LENGTH} caracteres`);
}


exports.checkGroupExists = (fieldName) => {
  return body(fieldName)
    .custom(async value => {
      return await db.one('SELECT nome FROM grupo WHERE nome = $1;', value);
    })
    .withMessage('Grupo escolhido não existe')
}


exports.validatePassword = (fieldName) => {
  return body(fieldName)
    .isLength({
      min: config.MIN_PASSWORD_LENGTH,
      max: config.MAX_PASSWORD_LENGTH
    })
    .withMessage(`A senha deve conter de ${config.MIN_PASSWORD_LENGTH} até ${config.MAX_PASSWORD_LENGTH} caracteres`)
    .matches(/[a-z]/)
    .withMessage('Senha deve conter ao menos uma letra minúscula')
    .matches(/[A-Z]/)
    .withMessage('Senha deve conter ao menos uma letra maiúscula');
}


exports.matchingPasswords = (field1, field2) => {
  return body(field1)
    .custom((value, { req }) => {
      return value === req.body[field2];
    })
    .withMessage('A Senha e a confirmação da senha devem ser iguais.')
}


exports.validateGroup = (fieldName) => {
  return body(fieldName)
    .isString()
    .withMessage('O nome do grupo deve ser uma sequência de caracteres')
    .trim()
    .isLength({
      min: config.MIN_GROUP_NAME_LENGTH,
      max: config.MAX_GROUP_NAME_LENGTH
    })
    .withMessage(`O nome do grupo deve ter de ${config.MIN_GROUP_NAME_LENGTH} até ${config.MAX_GROUP_NAME_LENGTH} caracteres`);
}


exports.checkGroupNotExists = (fieldName) => {
  return body(fieldName)
    .custom(async value => {
      return await db.none('SELECT nome FROM grupo WHERE nome = $1;', value);
    })
    .withMessage('Nome de grupo inserido já existe')
}


exports.validateLogin = (fieldName) => {
  return body(fieldName, 'E-mail ou senha incorreto(s)')
    .trim()
    .isEmail();
}
