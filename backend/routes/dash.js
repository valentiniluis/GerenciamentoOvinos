const express = require('express');
const router = express.Router();

const dashControllers = require('../controllers/dash');
const isAuth = require('../middleware/isAuth');

router.get('/', isAuth, dashControllers.getDash);

module.exports = router;