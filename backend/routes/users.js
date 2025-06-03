const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/users');

router.get('/', usersControllers.getUsers);
router.get('/:email', usersControllers.getUser);

module.exports = router;