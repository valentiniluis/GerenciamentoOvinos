const { body, param } = require('express-validator');
const config = require('./config/validation-config');
const db = require('../model/database');


exports.validateId = (fieldname) => {
  return body(fieldname)
    .isAscii()
    .withMessage('Número do Brinco contém símbolo inválido')
    .isLength({
      min: config.MIN_ID_LENGTH,
      max: config.MAX_ID_LENGTH
    })
    .withMessage(`Número do Brinco deve ter de ${config.MIN_ID_LENGTH} até ${config.MAX_ID_LENGTH} caracteres`);
}


exports.checkOptionalExistingId = (fieldname, message) => {
  return body(fieldname)
    .optional()
    .custom(async value => {
      return await db.one('SELECT brinco_num FROM ovino WHERE brinco_num = $1;', value)
    })
    .withMessage(message);
}


exports.checkExistingId = (fieldname, message) => {
  return body(fieldname)
    .custom(async value => await db.one('SELECT brinco_num FROM ovino WHERE brinco_num = $1;', value))
    .withMessage(message);
}


exports.checkIdNotExists = (fieldname) => {
  return body(fieldname)
    .custom(async value => await db.none('SELECT brinco_num FROM ovino WHERE brinco_num = $1;', value))
    .withMessage('Ovino com esse brinco já foi cadastrado')
}


exports.validateRace = (fieldname) => {
  return body(fieldname)
    .isString()
    .withMessage('Raça deve ser uma sequência de caracteres')
    .isLength({
      min: config.MIN_RACE_LENGTH,
      max: config.MAX_RACE_LENGTH
    })
    .withMessage(`Raça deve conter de ${config.MIN_RACE_LENGTH} até ${config.MAX_RACE_LENGTH} caracteres`);
}


exports.validateSex = (fieldname) => {
  return body(fieldname, "Sexo deve ser 'M' para masculino ou 'F' para feminino")
    .isIn(['M', 'F']);
}


exports.validateDate = (fieldname, label) => {
  return body(fieldname, `${label} deve ser uma data válida`)
    .isDate();
}


exports.validateGoal = (fieldname) => {
  return body(fieldname, 'Opção inválida para finalidade')
    .isIn(['Reprodução', 'Venda', 'Abate', 'Leite', 'Outra']);
}


exports.validateWeight = (fieldname) => {
  return body(fieldname, 'Peso deve ser um número positivo')
    .isNumeric()
    .custom(value => value > 0);
}


exports.validateObservation = (fieldname) => {
  return body(fieldname, `Observação deve ser sequência de ${config.MIN_OBSERVATION_LENGTH} até ${config.MAX_OBSERVATION_LENGTH} caracteres`)
    .optional()
    .trim()
    .isString()
    .isLength({
      min: config.MIN_OBSERVATION_LENGTH,
      max: config.MAX_OBSERVATION_LENGTH
    });
}


exports.validateLifeStage = (fieldname) => {
  return body(fieldname, 'Etapa de vida inválida')
    .isIn(['Desmame', 'Engorda', 'Abate', 'Reprodução']);
}


exports.validatePermissions = (fieldname) => {
  return [
    body(fieldname, 'Nenhuma permissão foi inserida').isObject(),
    body(`${fieldname}.*`, 'Permissões inseridas são inválidas').optional().isBoolean()
  ];
}

// O validador a seguir checa se o ovino cuja pesagem será cadastrada já não
// possui registro de pesagem para a data da pesagem definida.
// É importante que não haja duas pesagens ocorridas no mesmo dia para um mesmo ovino
exports.validateWeighInConstraint = (sheepNumber, dateField) => {
  return body(sheepNumber)
    .custom(async (value, { req }) => {
      const dataPesagem = req.body[dateField];
      return await db.none('SELECT * FROM pesagem WHERE ovino_brinco = $1 AND data_pesagem = $2;', [value, dataPesagem]);
    })
    .withMessage('O ovino inserido já tem uma pesagem cadastrada nesse dia');
}


exports.validateDescriptionTask = (fieldname) => {
  return body(fieldname, 'Descrição da tarefa deve ser uma sequência de caracteres')
    .optional()
    .trim()
    .isString()
    .isLength({
      max: config.MAX_TASK_DESCRIPTION_LENGTH
    })
    .withMessage(`Descrição da tarefa deve conter no máximo ${config.MAX_TASK_DESCRIPTION_LENGTH} caracteres`);
}


exports.validateTaskName = (fieldname) => {
  return body(fieldname, 'Nome da tarefa deve ser uma sequência de caracteres')
    .trim()
    .isString()
    .isLength({
      min: config.MIN_TASK_NAME_LENGTH,
      max: config.MAX_TASK_NAME_LENGTH
    })
    .withMessage(`Nome da tarefa deve conter de ${config.MIN_TASK_NAME_LENGTH} até ${config.MAX_TASK_NAME_LENGTH} caracteres`);
}


exports.validateParamId = (fieldname, message) => {
  return param(fieldname)
    .custom(async value => await db.one('SELECT brinco_num FROM ovino WHERE brinco_num = $1;', value))
    .withMessage(message);
}


exports.validateIdUpdate = (fieldname) => {
  return body(fieldname)
    .custom(async (value, { req }) => {
      const { brinco } = req.params;
      // se o número do brinco é o mesmo dos params, então não houve alteração
      if (value === brinco) return true;
      // se o brinco é diferente, então não deve existir um ovino com esse brinco no banco de dados
      return await db.none('SELECT 1 FROM ovino AS ov WHERE ov.brinco_num = $1;', value);
    })
    .withMessage('Novo brinco inserido já está sendo usado por outro ovino');
}


exports.validateBoolean = (fieldname, message) => {
  return body(fieldname)
    .isBoolean()
    .withMessage(message);
}


exports.checkNotEqual = (fieldname1, fieldname2, message) => {
  return body(fieldname1)
    .custom((value1, { req }) => {
      const value2 = req.body[fieldname2];
      return value1 !== value2;
    })
    .withMessage(message);
}


exports.validateDeleteWeighIn = (message) => {
  return param('brinco')
    .custom((brinco, { req }) => {
      const { data } = req.params;
      const [dia, mes, ano] = data.split('-');
      const dataFormatada = [ano, mes, dia].join('-');
      return db.one('SELECT 1 FROM pesagem AS pe WHERE pe.ovino_brinco = $1 AND pe.data_pesagem = $2;', [brinco, dataFormatada]);
    })
    .withMessage(message);
}