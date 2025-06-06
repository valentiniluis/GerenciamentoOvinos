const db = require('../model/database');

exports.getGroups = async (req, res, next) => {
    try {
        const data = await db.manyOrNone(
            "WITH users_count AS ( \
                SELECT grupo, COUNT(*) AS membros \
                FROM usuario \
                GROUP BY grupo \
            ) \
            SELECT \
                gp.nome, gp.descricao, COALESCE(us.membros, 0) AS membros, \
                TO_CHAR(gp.data_criacao, 'DD/MM/YYYY') AS data_criacao \
            FROM grupo AS gp \
            LEFT JOIN users_count AS us \
            ON gp.nome = us.grupo;"
        );
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
    }
}


exports.createGroup = async (req, res, next) => {
    try {
        const { nome, descricao=null, data_criacao, visualizar_dados=false, visualizar_rebanho=false,
                visualizar_calendario=false, visualizar_grupos=false, alterar_rebanho=false,
                alterar_calendario=false, alterar_grupos=false } = req.body;
        await db.none(
            "INSERT INTO grupo (nome, descricao, data_criacao, perm_visual_dados, \
            perm_visual_rebanho, perm_visual_calendario, perm_visual_grupos, \
            perm_alter_rebanho, perm_alter_calendario, perm_alter_grupos) \
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);",
            [
                nome, descricao, data_criacao, visualizar_dados, visualizar_rebanho, visualizar_calendario,
                visualizar_grupos, alterar_rebanho, alterar_calendario, alterar_grupos
            ]
        );
        res.status(201).json({ success: true });
    } catch (err) {
        console.log(err);
    }
}