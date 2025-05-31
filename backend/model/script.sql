
DROP TABLE IF EXISTS usuario
CREATE TABLE usuario (
    email VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    grupo VARCHAR(255) NOT NULL,
    data_cadastro DATE NOT NULL,
    CONSTRAINT pk_usuario PRIMARY KEY (email)
)


-- A Primary Key seria composta de num_brinco e email(usuario)
-- Para facilitar, cria-se um ID
DROP TABLE IF EXISTS ovino
CREATE TABLE ovino (
    id SERIAL NOT NULL,
    email_dono VARCHAR(255) NOT NULL,
    num_brinco VARCHAR(50) NOT NULL,
    brinco_mae VARCHAR(50) NULL,
    raca VARCHAR(255) NOT NULL,
    sexo CHAR NOT NULL,
    peso_nasc NUMERIC(7, 3) NOT NULL,
    data_nasc DATE NOT NULL,
    finalidade VARCHAR(255) NOT NULL,
    abatido BOOLEAN NOT NULL,
    CONSTRAINT pk_ovino PRIMARY KEY (id),
    CONSTRAINT fk_ovino_dono FOREIGN KEY (email_dono) REFERENCES usuario(email),
    CONSTRAINT fk_mae_ovino FOREIGN KEY (brinco_mae) REFERENCES ovino(num_brinco),
    CONSTRAINT uk_dono_brinco UNIQUE (email_dono, num_brinco)
)


DROP TABLE IF EXISTS pesagem
CREATE TABLE pesagem (
    id_ovino SERIAL NOT NULL,
    peso NUMERIC(7, 3) NOT NULL,
    etapa_vida VARCHAR(255) NOT NULL,
    data_pesagem DATE NOT NULL,
    observacao VARCHAR(255) NULL,
    CONSTRAINT pk_pesagem PRIMARY KEY (id_ovino, data_pesagem),
    CONSTRAINT fk_pesagem_ovino FOREIGN KEY (id_ovino) REFERENCES ovino(id)
)


DROP TABLE IF EXISTS historico_medico
CREATE TABLE historico_medico (
    id_ovino SERIAL NOT NULL,
    doenca VARCHAR(255) NOT NULL,
    medicamento_aplicado VARCHAR(255) NULL,
    dose VARCHAR(50) NULL,                   -- pode ser em mg, ml, gramas, ...
    data_diagnostico DATE NOT NULL,
    responsavel VARCHAR(255) NOT NULL,
    observacao VARCHAR(255) NULL,
    CONSTRAINT pk_historico PRIMARY KEY (id_ovino, data_diagnostico),
    CONSTRAINT fk_historico_ovino FOREIGN KEY (id_ovino) REFERENCES ovino(id)
)


DROP TABLE IF EXISTS medicamento
CREATE TABLE medicamento (
    id SERIAL NOT NULL,
    email_usuario VARCHAR(255) NOT NULL,
    nome_produto VARCHAR(255) NOT NULL,
    data_aplicacao DATE NOT NULL,
    grupo_aplicacao VARCHAR(255) NOT NULL,
    CONSTRAINT pk_medicamento PRIMARY KEY (id),
    CONSTRAINT fk_medicamento_usuario FOREIGN KEY (email_usuario) REFERENCES usuario(email)
)
