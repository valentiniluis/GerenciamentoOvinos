const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const userValidation = require('../middleware/userValidation');
const { isAuthenticated } = require('../middleware/isAuth');


router.post('/login', [
  userValidation.validateLogin('email')
], authController.postLogin);

router.post('/signup', [
  userValidation.validateName('nome'),
  userValidation.validateEmail('email'),
  userValidation.validatePassword('senha'),
  userValidation.matchingPasswords('confirmacao_senha', 'senha'),
], authController.postStartAccount);

router.get('/permissoes', isAuthenticated, authController.getUserPermissions);

module.exports = router;