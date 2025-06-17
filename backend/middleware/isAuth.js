const jwt = require('jsonwebtoken');
const jwtConfig = require('../settings/jwtConfig');

const { JWT_SECRET } = jwtConfig;

module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.get('Authorization');

    let decodedToken = undefined;
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      decodedToken = jwt.verify(token, JWT_SECRET);
    }

    if (!decodedToken) {
      const error = new Error('Usuário não está autenticado');
      error.statusCode = 401;
      throw error;
    }

    req.userEmail = decodedToken.email;
    next();

  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    throw err;
  }
}