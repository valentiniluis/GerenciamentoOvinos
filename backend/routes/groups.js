const express = require('express');
const router = express.Router();

const groupsControllers = require('../controllers/groups');
const userValidation = require('../middleware/userValidation');
const dataValidation = require('../middleware/dataValidation');

router.get('/', groupsControllers.getGroups);

router.post('/', [
  userValidation.validateGroup('nome'),
  userValidation.checkGroupNotExists('nome'),
  ...dataValidation.validatePermissions('permissoes')
], groupsControllers.createGroup);

router.get('/:nome', groupsControllers.getGroup);

router.put('/:nome', [
  userValidation.validateGroup('nome'),
  userValidation.validateGroupUpdate('nome'),
  ...dataValidation.validatePermissions('permissoes')
], groupsControllers.putGroup);

router.delete('/:nome', [
  userValidation.validateParamsGroup('nome', 'Grupo não encontrado')
], groupsControllers.deleteGroup);


module.exports = router;