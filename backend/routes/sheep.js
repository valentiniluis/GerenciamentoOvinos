const express = require('express');
const router = express.Router();

const sheepControllers = require('../controllers/sheep');
const dataValidation = require('../middleware/dataValidation');

router.get('/', sheepControllers.getSheep);

router.post('/', [
  dataValidation.checkExistingId('brinco_mae', "Brinco de ovelha mãe não está cadastrado"),
  dataValidation.validateId('num_brinco'),
  dataValidation.validateRace('raca'),
  dataValidation.validateSex('sexo'),
  dataValidation.validateDate('data_nasc', "Data de nascimento"),
  dataValidation.validateGoal('finalidade'),
  dataValidation.validateWeight('peso_nasc'),
  dataValidation.checkIdNotExists('num_brinco')],
  sheepControllers.postSheep);

router.get('/:brinco', sheepControllers.getOneSheep);

router.post('/pesagem', [
  dataValidation.checkExistingId('num_brinco', "Brinco de ovino não está cadastrado"),
  dataValidation.validateLifeStage('etapa_vida'),
  dataValidation.validateWeight('peso'),
  dataValidation.validateDate('data_pesagem', 'Data de pesagem'),
  dataValidation.validateObservation('observacao'),
  dataValidation.validateWeighInConstraint('num_brinco', 'data_pesagem')],
  sheepControllers.postWeighIn);


module.exports = router;