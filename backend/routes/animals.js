const express = require('express');

const router = express.Router();

router.get('/rebanho', (req, res, next) => {
    const dados = [
        {
            num_brinco: '1002',
            brinco_mae: '731',
            data_nasc: '18/12/2023',
            raca: 'Santa Ines',
            sexo: 'M',
            finalidade: 'Reprodução'
        }
    ]

    return res.json(dados);
});

module.exports = router;