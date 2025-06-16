const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/users');
const userValidation = require('../middleware/userValidation');

router.get('/', usersControllers.getUsers);

router.post('/', [
  userValidation.validateName('nome'),
  userValidation.validateEmail('email'),
  userValidation.checkGroupExists('grupo'),
  userValidation.validatePassword('senha'),
  userValidation.matchingPasswords('confirmacao_senha', 'senha')],
  usersControllers.createUser);

router.get('/:email', usersControllers.getUser);

module.exports = router;