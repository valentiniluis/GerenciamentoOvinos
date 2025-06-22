const express = require('express');
const router = express.Router();

const dashControllers = require('../controllers/dash');

router.get('/', dashControllers.getDash);

module.exports = router;