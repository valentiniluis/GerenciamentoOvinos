const express = require('express');
const router = express.Router();

const groupsControllers = require('../controllers/groups');

router.get('/', groupsControllers.getGroups);
router.post('/', groupsControllers.createGroup);

module.exports = router;