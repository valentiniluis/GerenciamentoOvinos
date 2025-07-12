const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/users');
const userValidation = require('../middleware/userValidation');

router.get('/', usersControllers.getUsers);

router.post('/', [
  userValidation.validateName('nome'),
  userValidation.validateEmail('email'),
  userValidation.checkGroupExists('grupo_nome'),
  userValidation.validatePassword('senha'),
  userValidation.matchingPasswords('confirmacao_senha', 'senha'),
  userValidation.checkUserNotExists('email')
], usersControllers.createUser);

router.get('/:email', usersControllers.getUser);

router.put('/:email', [
  userValidation.validateName('nome'),
  userValidation.validateEmailUpdate('email', 'Novo e-mail inserido já está em uso'),
  userValidation.validateEmail('email'),
  userValidation.checkGroupExists('grupo_nome')
], usersControllers.putUser);

router.delete('/:email', [
  userValidation.validateParamsEmail('email')
], usersControllers.deleteUser);

module.exports = router;