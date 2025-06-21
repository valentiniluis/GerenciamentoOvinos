const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/users');
const userValidation = require('../middleware/userValidation');
const dataValidation = require('../middleware/dataValidation');

router.get('/', usersControllers.getUsers);

router.post('/', [
  userValidation.validateName('nome'),
  userValidation.validateEmail('email'),
  userValidation.checkGroupExists('grupo_nome'),
  userValidation.validatePassword('senha'),
  userValidation.matchingPasswords('confirmacao_senha', 'senha'),
  dataValidation.validateDate('data_cadastro', 'Data de cadastro'),
  userValidation.checkUserNotExists('email')],
  usersControllers.createUser);

router.get('/:email', usersControllers.getUser);

module.exports = router;