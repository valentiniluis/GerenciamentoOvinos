const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;


module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
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