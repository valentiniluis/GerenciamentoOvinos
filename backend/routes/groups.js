const express = require('express');
const router = express.Router();

const groupsControllers = require('../controllers/groups');
const userValidation = require('../middleware/userValidation');
const dataValidation = require('../middleware/dataValidation');
const { isAuthenticated, isAuthorized } = require('../middleware/isAuth');


router.get('/', isAuthenticated, isAuthorized('perm_visual_grupos'), groupsControllers.getGroups);

router.post('/', isAuthenticated, isAuthorized('perm_alter_usuario_grupo'), [
  userValidation.validateGroup('nome'),
  userValidation.checkGroupNotExists('nome'),
  ...dataValidation.validatePermissions('permissoes')
], groupsControllers.createGroup);

router.get('/:nome', isAuthenticated, isAuthorized('perm_visual_grupos'), groupsControllers.getGroup);

router.put('/:nome', isAuthenticated, isAuthorized('perm_alter_usuario_grupo'), [
  userValidation.validateGroup('nome'),
  userValidation.validateGroupUpdate('nome'),
  ...dataValidation.validatePermissions('permissoes')
], groupsControllers.putGroup);

router.delete('/:nome', isAuthenticated, isAuthorized('perm_alter_usuario_grupo'), [
  userValidation.validateParamsGroup('nome', 'Grupo não encontrado')
], groupsControllers.deleteGroup);


module.exports = router;