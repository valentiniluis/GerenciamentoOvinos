const express = require('express');
const app = express();

const SERVER_PORT = 3000;

app.use(express.json());

const authRoutes = require('./routes/auth');
const animalRoutes = require('./routes/sheep');
const userRoutes = require('./routes/users');
const groupRoutes = require('./routes/groups');

// função temporária para permitir requests vindas da port do front-end
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.use(authRoutes);
app.use('/rebanho', animalRoutes);
app.use('/usuarios', userRoutes);
app.use('/grupos', groupRoutes);

app.listen(SERVER_PORT, () => console.log(`Servidor sendo executado na porta ${SERVER_PORT}...`))