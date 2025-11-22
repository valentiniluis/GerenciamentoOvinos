const db = require('../model/database');


// retorna uma promessa que pode falhar, deve ser usada dentro de um bloco try/catch
exports.getPermissions = async (userEmail) => {
  const result = await db.one(
    'SELECT \
        us.email, us.nome, \
        gp.perm_visual_rebanho, \
        gp.perm_visual_calendario, \
        gp.perm_visual_grupos, \
        gp.perm_alter_rebanho, \
        gp.perm_alter_calendario, \
        gp.perm_alter_usuario_grupo \
      FROM usuario AS us \
      INNER JOIN grupo AS gp \
      ON us.grupo_nome = gp.nome \
      WHERE us.email = $1;',
    userEmail);
  return result;
}


exports.getPagesAndClearData = (data, limit, key = 'data') => {
  const total_items = data.length > 0 ? +data[0].row_count : 0;
  const pages = Math.ceil(total_items / limit);
  // cleanup
  data.forEach(item => delete item.row_count);
  return { [key]: data, pages };
}