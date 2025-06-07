const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API de Gestão de Ovinos',
    description: 'Documentação automática com swagger-autogen',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
};

const outputFile = './doc/swagger_output.json'; 
const endpointsFiles = [
  './routes/auth.js',
  './routes/users.js',
  './routes/groups.js',
  './routes/sheep.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc);
