const express = require('express');
const router = express.Router();

const db = require('../model/database');

router.get('/', async (req, res, next) => {
    try {
        const data = await db.many('SELECT * FROM ovino');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;