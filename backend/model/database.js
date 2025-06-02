const pgp = require('pg-promise')({});

const user = 'meuusuario';
const password = 'minhasenha';
const host = 'localhost';
const port = '5432';
const database = 'meubanco';

const db = pgp(`postgres://${user}:${password}@${host}:${port}/${database}`);

module.exports = db;
