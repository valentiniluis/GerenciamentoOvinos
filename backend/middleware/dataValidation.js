const { body } = require('express-validator');
const config = require('./validation-config');
const db = require('../model/database');


exports.validateId = (fieldName) => {
  return body(fieldName)
    .isAscii()
    .withMessage('Número do Brinco contém símbolo inválido')
    .isLength({
      min: config.MIN_ID_LENGTH,
      max: config.MAX_ID_LENGTH
    })
    .withMessage(`Número do Brinco deve ter de ${config.MIN_ID_LENGTH} até ${config.MAX_ID_LENGTH} caracteres`);
}


exports.checkOptionalExistingId = (fieldName) => {
  return body(fieldName, 'Brinco de ovino mãe não está cadastrado')
    .optional()
    .custom(async value => {
      return await db.one('SELECT num_brinco FROM ovino WHERE num_brinco = $1;', value)
    });
}


exports.checkExistingId = (fieldName, message) => {
  return body(fieldName)
    .custom(async value => await db.one('SELECT num_brinco FROM ovino WHERE num_brinco = $1;', value))
    .withMessage(message);
}


exports.checkIdNotExists = (fieldName) => {
  return body(fieldName)
    .custom(async value => await db.none('SELECT num_brinco FROM ovino WHERE num_brinco = $1;', value))
    .withMessage('Ovino com esse brinco já foi cadastrado')
}


exports.validateRace = (fieldName) => {
  return body(fieldName)
    .isString()
    .withMessage('Raça deve ser uma sequência de caracteres')
    .isLength({
      min: config.MIN_RACE_LENGTH,
      max: config.MAX_RACE_LENGTH
    })
    .withMessage(`Raça deve conter de ${config.MIN_RACE_LENGTH} até ${config.MAX_RACE_LENGTH} caracteres`);
}


exports.validateSex = (fieldName) => {
  return body(fieldName, "Sexo deve ser 'M' para masculino ou 'F' para feminino")
    .isIn(['M', 'F']);
}


exports.validateDate = (fieldName, label) => {
  return body(fieldName, `${label} deve ser uma data válida`)
    .isDate();
}


exports.validateGoal = (fieldName) => {
  return body(fieldName, 'Opção inválida para finalidade')
    .isIn(['Reprodução', 'Venda', 'Abate', 'Leite', 'Outra']);
}


exports.validateWeight = (fieldName) => {
  return body(fieldName, 'Peso deve ser um número positivo')
    .isNumeric()
    .custom(value => value > 0);
}


exports.validateObservation = (fieldName) => {
  return body(fieldName, `Observação deve ser sequência de ${config.MIN_OBSERVATION_LENGTH} até ${config.MAX_OBSERVATION_LENGTH} caracteres`)
    .optional()
    .trim()
    .isString()
    .isLength({
      min: config.MIN_OBSERVATION_LENGTH,
      max: config.MAX_OBSERVATION_LENGTH
    });
}


exports.validateLifeStage = (fieldName) => {
  return body(fieldName, 'Etapa de vida inválida')
    .isIn(['Desmame', 'Engorda', 'Abate', 'Reprodução']);
}


exports.validatePermissions = (fieldName) => {
  return [
    body(fieldName, 'Nenhuma permissão foi inserida').isObject(),
    body(`${fieldName}.*`, 'Permissões inseridas são inválidas').optional().isBoolean()
  ];
}

// O validador a seguir checa se o ovino cuja pesagem será cadastrada já não
// possui registro de pesagem para a data da pesagem definida.
// É importante que não haja duas pesagens ocorridas no mesmo dia para um mesmo ovino
exports.validateWeighInConstraint = (sheepNumber, dateField) => {
  return body(sheepNumber)
    .custom(async (value, { req }) => {
      const dataPesagem = req.body[dateField];
      return await db.none('SELECT * FROM pesagem WHERE brinco_ovino = $1 AND data_pesagem = $2;', [value, dataPesagem]);
    })
    .withMessage('O ovino inserido já tem uma pesagem cadastrada nesse dia');
}