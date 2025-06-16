const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const userValidation = require('../middleware/userValidation');
const dataValidation = require('../middleware/dataValidation');


router.post('/login', [
  userValidation.validateLogin('email')],
  authController.postLogin);

router.post('/cadastro', [
  userValidation.validateName('nome'),
  userValidation.validateEmail('email'),
  userValidation.validatePassword('senha'),
  userValidation.matchingPasswords('confirmacao_senha', 'senha'),
  dataValidation.validateDate('data_cadastro')
  ],
  authController.postStartAccount);


module.exports = router;