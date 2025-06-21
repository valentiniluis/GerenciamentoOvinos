const express = require('express');
const router = express.Router();

const tarefaControllers = require('../controllers/tasks');
const dataValidation = require('../middleware/dataValidation');

router.get('/', tarefaControllers.getTarefas);

// router.post('/',
//   dataValidation.validateTitleTask('tarefa_nome'),
//   dataValidation.validateDescriptionTask('tarefa_descricao'),
//   dataValidation.validateDateTask('data_criacao'),
//   tarefaControllers.postTarefas
// );

module.exports = router;