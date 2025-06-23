require('dotenv').config();
const pgp = require('pg-promise')({});

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT || '5432';
const database = process.env.DB_NAME;

const db = pgp(`postgres://${user}:${password}@${host}:${port}/${database}`);

module.exports = db;
