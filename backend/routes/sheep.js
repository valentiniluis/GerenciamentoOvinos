const express = require('express');
const router = express.Router();

const sheepControllers = require('../controllers/sheep');
const dataValidation = require('../middleware/dataValidation');

router.get('/', sheepControllers.getSheep);

router.post('/', [
  dataValidation.checkExistingId('brinco_mae', "Brinco de ovelha mãe não está cadastrado"),
  dataValidation.validateId('brinco_num'),
  dataValidation.validateRace('raca'),
  dataValidation.validateSex('sexo'),
  dataValidation.validateDate('data_nascimento', "Data de nascimento"),
  dataValidation.validateGoal('finalidade'),
  dataValidation.validateWeight('peso_nascimento'),
  dataValidation.checkIdNotExists('brinco_num')],
  sheepControllers.postSheep);

router.get('/:brinco', sheepControllers.getOneSheep);

router.post('/pesagem', [
  dataValidation.checkExistingId('brinco_num', "Brinco de ovino não está cadastrado"),
  dataValidation.validateLifeStage('etapa_vida'),
  dataValidation.validateWeight('peso'),
  dataValidation.validateDate('data_pesagem', 'Data de pesagem'),
  dataValidation.validateObservation('observacao'),
  dataValidation.validateWeighInConstraint('brinco_num', 'data_pesagem')],
  sheepControllers.postWeighIn);


module.exports = router;