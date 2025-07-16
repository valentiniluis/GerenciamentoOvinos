const express = require('express');
const router = express.Router();

const sheepControllers = require('../controllers/sheep');
const dataValidation = require('../middleware/dataValidation');
const { isAuthenticated, isAuthorized } = require('../middleware/isAuth');


router.get('/', isAuthenticated, isAuthorized('perm_visual_rebanho'), sheepControllers.getSheep);

router.post('/', isAuthenticated, isAuthorized('perm_alter_rebanho'), [
  dataValidation.checkOptionalExistingId('brinco_mae', "Brinco de ovelha mãe não está cadastrado"),
  dataValidation.validateId('brinco_num'),
  dataValidation.validateRace('raca'),
  dataValidation.validateSex('sexo'),
  dataValidation.validateDate('data_nascimento', "Data de nascimento"),
  dataValidation.validateGoal('finalidade'),
  dataValidation.validateWeight('peso_nascimento'),
  dataValidation.checkIdNotExists('brinco_num')
], sheepControllers.postSheep);


router.put('/:brinco', isAuthenticated, isAuthorized('perm_alter_rebanho'), [
  dataValidation.checkOptionalExistingId('brinco_mae', "Brinco de ovelha mãe não está cadastrado"),
  dataValidation.validateIdUpdate('brinco_num'),
  dataValidation.validateId('brinco_num'),
  dataValidation.checkNotEqual('brinco_num', 'brinco_mae', 'Brinco do ovino e brinco da mãe do ovino não podem ser iguais'),
  dataValidation.validateRace('raca'),
  dataValidation.validateSex('sexo'),
  dataValidation.validateDate('data_nascimento', "Data de nascimento"),
  dataValidation.validateGoal('finalidade'),
  dataValidation.validateWeight('peso_nascimento'),
  dataValidation.validateBoolean('abatido', "'Abatido' deve ter valor verdadeiro ou falso")
], sheepControllers.putSheep);


router.delete('/:brinco', isAuthenticated, isAuthorized('perm_alter_rebanho'), [
  dataValidation.validateParamId('brinco', 'Brinco de ovino não está cadastrado')
], sheepControllers.deleteSheep);


router.get('/:brinco', isAuthenticated, isAuthorized('perm_visual_rebanho'), sheepControllers.getOneSheep);


router.post('/pesagem', isAuthenticated, isAuthorized('perm_alter_rebanho'), [
  dataValidation.checkExistingId('brinco_num', "Brinco de ovino não está cadastrado"),
  dataValidation.validateLifeStage('etapa_vida'),
  dataValidation.validateWeight('peso'),
  dataValidation.validateDate('data_pesagem', 'Data de pesagem'),
  dataValidation.validateObservation('observacao'),
  dataValidation.validateWeighInConstraint('brinco_num', 'data_pesagem')
], sheepControllers.postWeighIn);


router.delete('/:brinco/pesagem/:data', isAuthenticated, isAuthorized('perm_alter_rebanho'), [
  dataValidation.validateDeleteWeighIn('Não há pesagem do ovino no dia especificado')
], sheepControllers.deleteWeighIn);


module.exports = router;