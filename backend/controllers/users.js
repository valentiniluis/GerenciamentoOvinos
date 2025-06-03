const db = require('../model/database');

exports.getUsers = async (req, res, next) => {
    try {
        const data = await db.manyOrNone('select * from usuario;');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
    }
}

exports.getUser = async (req, res, next) => {
    const { email } = req.params;
    try {
        const data = await db.one('select * from usuario where email = $1;', [email]);
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
    }
}

