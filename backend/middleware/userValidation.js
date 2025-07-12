const { body, param } = require('express-validator');
const config = require('./config/validation-config');
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


exports.validateEmailUpdate = (fieldname, message) => {
  return body(fieldname)
    .custom(async (value, { req }) => {
      const { email: currentEmail } = req.params;
      if (value === currentEmail) return true;
      return await db.none('SELECT 1 FROM usuario AS us WHERE us.email = $1;', value);
    })
    .withMessage(message);
}


exports.validateParamsEmail = (fieldname) => {
  return param(fieldname)
    .custom(async (value) => {
      return await db.one('SELECT 1 FROM usuario AS us WHERE us.email = $1;', value);
    })
    .withMessage('E-mail não cadastrado');
}


exports.validateGroupUpdate = (fieldname) => {
  return body(fieldname)
    .custom((novo_nome, { req }) => {
      const { nome: antigo_nome } = req;
      if (novo_nome === antigo_nome) return true;
      return db.none('SELECT 1 FROM grupos AS gp WHERE gp.nome = $1;', novo_nome);
    })
    .withMessage('Nome de grupo inserido está em uso');
}


exports.validateParamsGroup = (fieldname, message) => {
  return param(fieldname)
    .custom((grupo) => {
      return db.one('SELECT 1 FROM grupo AS gp WHERE gp.nome = $1;', grupo);
    })
    .withMessage(message);
}