const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    const data = [
        { 
            'nome': 'Luís', 
            'email': 'luis@gmail.com', 
            'grupo': 'Adm', 
            'data_cadastro': '2024-06-12'
        }
    ];

    res.status(200).json(data);
});

module.exports = router;