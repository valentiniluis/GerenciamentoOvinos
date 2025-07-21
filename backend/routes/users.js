const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/users');
const userValidation = require('../middleware/userValidation');
const { isAuthenticated, isAuthorized } = require('../middleware/isAuth');

router.get('/', isAuthenticated, isAuthorized('perm_visual_grupos'), usersControllers.getUsers);

router.post('/', isAuthenticated, isAuthorized('perm_alter_usuario_grupo'), [
  userValidation.validateName('nome'),
  userValidation.validateEmail('email'),
  userValidation.checkGroupExists('grupo_nome'),
  userValidation.validatePassword('senha'),
  userValidation.matchingPasswords('confirmacao_senha', 'senha'),
  userValidation.checkUserNotExists('email')
], usersControllers.createUser);

router.get('/perfil', isAuthenticated, usersControllers.getProfile);

router.put('/perfil', isAuthenticated, [
  userValidation.validateName('nome'),
  userValidation.validateProfileEmailUpdate('email', 'E-mail inserido já está em uso'),
  userValidation.validateEmail('email'),
], usersControllers.putProfile);

router.get('/:email', isAuthenticated, isAuthorized('perm_visual_grupos'), usersControllers.getUser);

router.put('/:email', isAuthenticated, isAuthorized('perm_alter_usuario_grupo'), [
  userValidation.validateName('nome'),
  userValidation.validateEmailUpdate('email', 'Novo e-mail inserido já está em uso'),
  userValidation.validateEmail('email'),
  userValidation.checkGroupExists('grupo_nome')
], usersControllers.putUser);

router.delete('/:email', isAuthenticated, isAuthorized('perm_alter_usuario_grupo'), [
  userValidation.validateParamsEmail('email')
], usersControllers.deleteUser);


module.exports = router;