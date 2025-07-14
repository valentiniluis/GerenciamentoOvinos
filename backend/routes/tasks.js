const express = require('express');
const router = express.Router();

const tarefaControllers = require('../controllers/tasks');
const dataValidation = require('../middleware/dataValidation');
const isAuth = require('../middleware/isAuth');

router.get('/', isAuth, tarefaControllers.getTarefas);

router.post('/', isAuth, [
  dataValidation.validateDate('data_criacao'),
  dataValidation.validateDescriptionTask('tarefa_descricao'),
  dataValidation.validateTaskName('tarefa_nome'),
], tarefaControllers.postTarefas);

module.exports = router;