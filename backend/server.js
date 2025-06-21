const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./doc/swagger_output.json');

const app = express();

const SERVER_PORT = 3000;

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.json());

const authRoutes = require('./routes/auth');
const animalRoutes = require('./routes/sheep');
const userRoutes = require('./routes/users');
const groupRoutes = require('./routes/groups');
const taskRoutes = require('./routes/tasks');

// função para permitir requests vindas da port do front-end
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
app.use('/tarefas', taskRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const httpStatusCode = error.statusCode || 500;
    const message = error.message;
    res.status(httpStatusCode).json({ success: false, message });
})

app.listen(SERVER_PORT, () => console.log(`Servidor sendo executado na porta ${SERVER_PORT}...`))