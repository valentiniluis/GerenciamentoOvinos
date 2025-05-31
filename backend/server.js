const express = require('express');
const app = express();

const SERVER_PORT = 3000;

const authRoutes = require('./routes/auth');
const animalRoutes = require('./routes/animals');
const userRoutes = require('./routes/users');

app.use(authRoutes);
app.use('/rebanho', animalRoutes);
app.use('/usuario', userRoutes);

app.listen(SERVER_PORT, () => console.log(`Servidor sendo executado na porta ${SERVER_PORT}...`))