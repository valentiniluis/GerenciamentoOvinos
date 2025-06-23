const express = require('express');
const router = express.Router();

const groupsControllers = require('../controllers/groups');
const userValidation = require('../middleware/userValidation');
const dataValidation = require('../middleware/dataValidation');

router.get('/', groupsControllers.getGroups);

router.post('/', [
  userValidation.validateGroup('nome'), 
  dataValidation.validateDate('data_criacao', 'Data de criação'),
  userValidation.checkGroupNotExists('nome'),
  ...dataValidation.validatePermissions('permissoes')],
  groupsControllers.createGroup);

module.exports = router;