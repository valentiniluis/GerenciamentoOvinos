INSERT INTO usuario(email, nome, senha, grupo, data_cadastro)
VALUES
('usuarioum@gmail.com', 'Usuário Um', 'Senha1', 'Administradores', '2022-01-01'),
('usuariodois@yahoo.com', 'Usuário Dois', 'Senha2', 'Fiscais', '2023-01-01'),
('usuariotres@hotmail.com', 'Usuário Três', 'Senha3', 'Administradores', '2024-12-01'),
('usuarioquatro@outlook.com', 'Usuário Quatro', 'Senha4', 'Auxiliares', '2024-12-25'),
('usuariocinco@aol.com', 'Usuário Cinco', 'Senha5', 'Auxiliares', '2025-01-01');


INSERT INTO ovino(num_brinco, brinco_mae, raca, sexo, peso_nasc, data_nasc, finalidade, abatido)
VALUES
('1N123', NULL, 'Santa Inês', 'F', 3.500, '2021-01-01', 'Reprodução', false),
('1N124', '1N123', 'Santa Inês', 'F', 3.700, '2023-02-01', 'Reprodução', false),
('1N125', '1N123', 'Santa Inês', 'M', 4.0, '2023-02-01', 'Abate', true),
('1N126', '1N124', 'Santa Inês', 'M', 3.800, '2025-01-01', 'Venda', false),
('1N127', NULL, 'Dorper', 'F', 3.450, '2025-02-02', 'Reprodução', false);


INSERT INTO pesagem(brinco_ovino, peso, etapa_vida, data_pesagem, observacao)
VALUES
('1N125', 10.400, 'Desmame', '2023-03-05', NULL),
('1N125', 70.100, 'Engorda', '2024-01-01', NULL),
('1N125', 80.800, 'Abate', '2024-06-01', NULL);


INSERT INTO medicamento(nome_produto, data_aplicacao, grupo_aplicacao)
VALUES
('Vacina 1', '2024-12-01', 'Todos os Ovinos'),
('Medicamento 1', '2024-12-01', 'Ovinos Adultos'),
('Vacina 2', '2025-04-01', 'Ovinos Filhotes');


INSERT INTO historico_medico(brinco_ovino, doenca, medicamento_aplicado, dose, data_diagnostico, responsavel, observacao)
VALUES
('1N123', 'Brucelose', 'Antibiótico', '500mg', '2022-09-01', 'Usuário Um', NULL),
('1N125', 'Língua Azul', 'Vacinação', '20ml', '2024-01-01', 'Usuário Dois', NULL),
('1N124', 'PPR', 'Anti-helmíntico', '50mg', '2023-10-01', 'Usuario Um', NULL);