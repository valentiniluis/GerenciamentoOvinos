const express = require('express');
const router = express.Router();

const taskControllers = require('../controllers/tasks');
const dataValidation = require('../middleware/dataValidation');
const { isAuthenticated, isAuthorized } = require('../middleware/isAuth');

router.get('/',
  isAuthenticated,
  isAuthorized('perm_visual_calendario'),
  taskControllers.getTasks
);

router.post('/',
  isAuthenticated,
  isAuthorized('perm_alter_calendario'), [
  dataValidation.validateDate('data_criacao'),
  dataValidation.validateDescriptionTask('tarefa_descricao'),
  dataValidation.validateTaskName('tarefa_nome'),
], taskControllers.postTask);

router.put('/',
  isAuthenticated,
  isAuthorized('perm_alter_calendario'), [
  dataValidation.validateDate('data_criacao'),
  dataValidation.validateDescriptionTask('descricao'),
  dataValidation.validateTaskName('tarefa_nome'),
], taskControllers.putTask);

router.delete('/:title/:date',
  isAuthenticated,
  isAuthorized('perm_alter_calendario'),
  taskControllers.deleteTask
);

module.exports = router;