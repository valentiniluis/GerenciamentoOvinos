const express = require('express');
const router = express.Router();

const dashControllers = require('../controllers/dash');
const { isAuthenticated } = require('../middleware/isAuth');

router.get('/', isAuthenticated, dashControllers.getDash);

module.exports = router;