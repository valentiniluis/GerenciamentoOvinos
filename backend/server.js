const express = require('express');
const app = express();

const SERVER_PORT = 3000;

const animalRoutes = require('./routes/animals');

app.use(animalRoutes);

app.listen(SERVER_PORT, () => console.log(`Servidor sendo executado na porta ${SERVER_PORT}...`))