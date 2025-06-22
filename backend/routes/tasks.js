const express = require('express');
const router = express.Router();

const tarefaControllers = require('../controllers/tasks');
const dataValidation = require('../middleware/dataValidation');

router.get('/', tarefaControllers.getTarefas);

router.post('/', [
  dataValidation.validateDate('data_criacao'),
  dataValidation.validateDescriptionTask('tarefa_descricao'),
  dataValidation.validateTaskName('tarefa_nome'),
],
  tarefaControllers.postTarefas
);

module.exports = router;