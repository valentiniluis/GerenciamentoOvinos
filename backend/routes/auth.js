const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const userValidation = require('../middleware/userValidation');

router.post('/login', [
  userValidation.validateLogin('email')
], authController.postLogin);

router.post('/signup', [
  userValidation.validateName('nome'),
  userValidation.validateEmail('email'),
  userValidation.validatePassword('senha'),
  userValidation.matchingPasswords('confirmacao_senha', 'senha'),
], authController.postStartAccount);


module.exports = router;