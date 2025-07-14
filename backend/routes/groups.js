const express = require('express');
const router = express.Router();

const groupsControllers = require('../controllers/groups');
const userValidation = require('../middleware/userValidation');
const dataValidation = require('../middleware/dataValidation');
const isAuth = require('../middleware/isAuth');


router.get('/', isAuth, groupsControllers.getGroups);

router.post('/', isAuth, [
  userValidation.validateGroup('nome'),
  userValidation.checkGroupNotExists('nome'),
  ...dataValidation.validatePermissions('permissoes')
], groupsControllers.createGroup);

router.get('/:nome', isAuth, groupsControllers.getGroup);

router.put('/:nome', isAuth, [
  userValidation.validateGroup('nome'),
  userValidation.validateGroupUpdate('nome'),
  ...dataValidation.validatePermissions('permissoes')
], groupsControllers.putGroup);

router.delete('/:nome', isAuth, [
  userValidation.validateParamsGroup('nome', 'Grupo não encontrado')
], groupsControllers.deleteGroup);


module.exports = router;