INSERT INTO grupo (
    nome,
    descricao,
    data_criacao, 
    perm_visual_rebanho, 
    perm_visual_calendario, 
    perm_visual_grupos,
    perm_alter_rebanho,
    perm_alter_calendario,
    perm_alter_usuario_grupo
) VALUES
('Administrador', 'Grupo com acesso total', '2024-12-06', true, true, true, true, true, true);

INSERT INTO usuario (
    email, 
    nome, 
    senha, 
    grupo_nome, 
    data_cadastro
) VALUES
('admin@admin.com', 'Admin', 'senhaAdmin', 'Administrador', '2022-01-01');

INSERT INTO ovino (
    brinco_num, 
    brinco_mae, 
    usuario_email, 
    raca, 
    sexo, 
    peso_nascimento, 
    data_nascimento, 
    finalidade, 
    abatido
) VALUES
('1N123', NULL, 'admin@admin.com', 'Santa Inês', 'F', 3.500, '2021-01-01', 'Reprodução', false),
('1N124', '1N123', 'admin@admin.com', 'Santa Inês', 'F', 3.700, '2023-02-01', 'Reprodução', false),
('1N125', '1N123', 'admin@admin.com', 'Santa Inês', 'M', 4.000, '2023-02-01', 'Abate', true),
('1N126', '1N124', 'admin@admin.com', 'Santa Inês', 'M', 3.800, '2025-01-01', 'Venda', false),
('1N127', NULL, 'admin@admin.com', 'Dorper', 'F', 3.450, '2025-02-02', 'Reprodução', false);

INSERT INTO pesagem (
    ovino_brinco, 
    peso, 
    etapa_vida, 
    data_pesagem, 
    observacao
) VALUES
('1N125', 10.400, 'Desmame', '2023-03-05', NULL),
('1N125', 70.100, 'Engorda', '2024-01-01', NULL),
('1N125', 80.800, 'Abate', '2024-06-01', NULL);

INSERT INTO medicamento (
    nome_produto
) VALUES
('Vacina 1'),
('Medicamento 1'),
('Vacina 2'),
('Antibiótico'),
('Vacinação'),
('Anti-helmíntico');

INSERT INTO aplicacao_medicamento (
    usuario_email, 
    medicamento_nome, 
    data_aplicacao, 
    grupo_aplicacao
) VALUES
('admin@admin.com', 'Medicamento 1', '2024-12-01', 'Ovinos Adultos'),
('admin@admin.com', 'Vacina 2', '2025-04-01', 'Ovinos Filhotes');

INSERT INTO historico_medico (
    doenca_nome, 
    responsavel_tratamento, 
    observacao
) VALUES
('Brucelose', 'Usuário Um', NULL),
('Língua Azul', 'Usuário Dois', NULL),
('PPR', 'Usuario Um', NULL);

INSERT INTO historico_animal (
    doenca_nome, 
    ovino_brinco, 
    data_registro, 
    dose, 
    medicamento_nome
) VALUES
('Brucelose', '1N123', '2022-09-01', 0.500, 'Antibiótico'),
('Língua Azul', '1N125', '2024-01-01', 0.020, 'Vacinação'),
('PPR', '1N124', '2023-10-01', 0.050, 'Anti-helmíntico');
