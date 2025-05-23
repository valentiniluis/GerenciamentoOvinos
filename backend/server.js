const express = require('express');

const app = express();

const SERVER_PORT = 3000;


app.listen(SERVER_PORT, () => console.log(`Servidor sendo executado na porta ${SERVER_PORT}...`))