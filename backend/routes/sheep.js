const express = require('express');
const router = express.Router();

const sheepControllers = require('../controllers/sheep');

router.get('/', sheepControllers.getSheep);


module.exports = router;