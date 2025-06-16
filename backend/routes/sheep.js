const express = require('express');
const router = express.Router();

const sheepControllers = require('../controllers/sheep');
const dataValidation = require('../middleware/dataValidation');

router.get('/', sheepControllers.getSheep);

router.post('/', [
  dataValidation.checkExistingId('brinco_mae'),
  dataValidation.validateId('num_brinco'),
  dataValidation.validateRace('raca'),
  dataValidation.validateSex('sexo'),
  dataValidation.validateDate('data_nasc'),
  dataValidation.validateGoal('finalidade'),
  dataValidation.validateWeight('peso_nasc')],
  sheepControllers.postSheep);

router.get('/:brinco', sheepControllers.getOneSheep);

router.post('/pesagem', [
  dataValidation.checkExistingId('num_brinco'),
  dataValidation.validateLifeStage('etapa_vida'),
  dataValidation.validateWeight('peso'),
  dataValidation.validateDate('data_pesagem'),
  dataValidation.validateObservation('observacao')],
  sheepControllers.postWeighIn);


module.exports = router;