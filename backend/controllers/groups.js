const { validationResult } = require('express-validator');
const db = require('../model/database');


exports.getGroups = async (req, res, next) => {
    const queryArgs = [
        "WITH users_count AS ( \
                SELECT grupo_nome, COUNT(*) AS membros \
                FROM usuario \
                GROUP BY grupo_nome \
            ) \
            SELECT \
                gp.nome, gp.descricao, COALESCE(us.membros, 0) AS membros, \
                TO_CHAR(gp.data_criacao, 'DD/MM/YYYY') AS data_criacao \
            FROM grupo AS gp \
            LEFT JOIN users_count AS us \
            ON gp.nome = us.grupo_nome"
    ];
    const filterProps = req.query;
    const filters = Object.entries(filterProps).filter(([key]) => key !== 'page');
    if (filters.length > 0) {
        queryArgs[0] += " WHERE $1:name ILIKE '%$2#%';";
        queryArgs.push(filters[0]);
    }
    queryArgs[0] += ';';

    try {
        const data = await db.manyOrNone(...queryArgs);
        console.log(data);
        res.status(200).json(data);
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}


exports.createGroup = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = new Error(result.array()[0].msg)
        error.statusCode = 422;
        throw error;
    }

    try {
        const data_criacao = new Date().toISOString().split('T')[0];
        const { nome, permissoes } = req.body;
        let { descricao } = req.body;
        if (!descricao || descricao.length === 0) descricao = null;

        const {
            visualizar_rebanho = false,
            visualizar_calendario = false,
            visualizar_grupos = false,
            alterar_rebanho = false,
            alterar_calendario = false,
            alterar_grupos = false
        } = permissoes;

        await db.none(
            "INSERT INTO grupo (nome, descricao, data_criacao, perm_visual_rebanho, \
            perm_visual_calendario, perm_visual_grupos, \
            perm_alter_rebanho, perm_alter_calendario, perm_alter_usuario_grupo) \
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);",
            [
                nome, descricao, data_criacao, visualizar_rebanho, visualizar_calendario,
                visualizar_grupos, alterar_rebanho, alterar_calendario, alterar_grupos
            ]
        );
        res.status(201).json({ success: true, message: "Grupo criado com sucesso" });
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}


exports.putGroup = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = new Error(result.array()[0].msg)
        error.statusCode = 422;
        throw error;
    }

    try {
        const { nome: nome_antigo } = req.params;
        const { nome: novo_nome, permissoes } = req.body;
        let { descricao } = req.body;
        if (!descricao || descricao.length === 0) descricao = null;

        const {
            visualizar_rebanho = false,
            visualizar_calendario = false,
            visualizar_grupos = false,
            alterar_rebanho = false,
            alterar_calendario = false,
            alterar_grupos = false
        } = permissoes;

        await db.none(
            "UPDATE grupo \
            SET \
            nome = $1, \
            descricao = $2, \
            perm_visual_rebanho = $3, \
            perm_visual_calendario = $4, \
            perm_visual_grupos = $5, \
            perm_alter_rebanho = $6, \
            perm_alter_calendario = $7, \
            perm_alter_usuario_grupo = $8 \
            WHERE nome = $9;",
            [novo_nome, descricao, visualizar_rebanho, visualizar_calendario,
                visualizar_grupos, alterar_rebanho, alterar_calendario, alterar_grupos,
                nome_antigo]
        );
        res.status(201).json({ success: true, message: "Grupo atualizado com sucesso" });
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}


exports.deleteGroup = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = new Error(result.array()[0].msg)
        error.statusCode = 422;
        throw error;
    }

    try {
        const { nome } = req.params;
        await db.none("DELETE FROM grupo WHERE grupo.nome = $1;", nome);
        res.status(200).json({ success: true, message: "Grupo excluído com sucesso" });
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}


exports.getGroup = async (req, res, next) => {
    const { nome } = req.params;
    try {
        const data = await db.one(
            "SELECT * FROM grupo AS gp WHERE gp.nome = $1;",
            [nome]
        );
        res.status(200).json(data);
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        throw err;
    }
}