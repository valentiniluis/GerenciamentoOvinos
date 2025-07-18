const jwt = require('jsonwebtoken');
const { getPermissions } = require('../util/permissions');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;


exports.isAuthenticated = (req, res, next) => {
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


// isAuthorized recebe o nome da permissão necessária para realizar alguma ação.
// Com isso, a função retorna um middleware que consulta as permissões do usuário
// e avalia se ele tem tal permissão necessária.
exports.isAuthorized = permissionRequired => {
  return async (req, res, next) => {
    try {
      const { userEmail } = req;
      const permissions = await getPermissions(userEmail);
      if (!permissions[permissionRequired]) {
        const error = new Error('Usuário não autorizado');
        error.statusCode = 403;
        throw error;
      }
      next();
    } catch (err) {
      if (!err.statusCode) err.statusCode = 500;
      throw err;
    }
  }
}