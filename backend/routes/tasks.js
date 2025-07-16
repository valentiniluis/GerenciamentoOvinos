const express = require('express');
const router = express.Router();

const tarefaControllers = require('../controllers/tasks');
const dataValidation = require('../middleware/dataValidation');
const { isAuthenticated, isAuthorized } = require('../middleware/isAuth');

router.get('/', isAuthenticated, isAuthorized('perm_visual_calendario'), tarefaControllers.getTarefas);

router.post('/', isAuthenticated, isAuthorized('perm_alter_calendario'), [
  dataValidation.validateDate('data_criacao'),
  dataValidation.validateDescriptionTask('tarefa_descricao'),
  dataValidation.validateTaskName('tarefa_nome'),
], tarefaControllers.postTarefas);

module.exports = router;