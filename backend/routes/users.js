const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/users');
const userValidation = require('../middleware/userValidation');
const isAuth = require('../middleware/isAuth');

router.get('/', isAuth, usersControllers.getUsers);

router.post('/', isAuth, [
  userValidation.validateName('nome'),
  userValidation.validateEmail('email'),
  userValidation.checkGroupExists('grupo_nome'),
  userValidation.validatePassword('senha'),
  userValidation.matchingPasswords('confirmacao_senha', 'senha'),
  userValidation.checkUserNotExists('email')
], usersControllers.createUser);

router.get('/:email', isAuth, usersControllers.getUser);

router.put('/:email', isAuth, [
  userValidation.validateName('nome'),
  userValidation.validateEmailUpdate('email', 'Novo e-mail inserido já está em uso'),
  userValidation.validateEmail('email'),
  userValidation.checkGroupExists('grupo_nome')
], usersControllers.putUser);

router.delete('/:email', isAuth, [
  userValidation.validateParamsEmail('email')
], usersControllers.deleteUser);

module.exports = router;