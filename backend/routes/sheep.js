const express = require('express');
const router = express.Router();

const sheepControllers = require('../controllers/sheep');

router.get('/', sheepControllers.getSheep);
router.post('/', sheepControllers.postSheep);
router.get('/:brinco', sheepControllers.getOneSheep);
router.post('/pesagem', sheepControllers.postWeighIn);

module.exports = router;