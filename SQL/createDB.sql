
CREATE TABLE IF NOT EXISTS usuario (
    email VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    grupo VARCHAR(255) NOT NULL,
    data_cadastro DATE NOT NULL,
    CONSTRAINT pk_usuario PRIMARY KEY (email)
);


CREATE TABLE IF NOT EXISTS ovino (
    num_brinco VARCHAR(50) NOT NULL,
    brinco_mae VARCHAR(50) NULL,
    raca VARCHAR(255) NOT NULL,
    sexo CHAR NOT NULL,
    peso_nasc NUMERIC(7, 3) NOT NULL,
    data_nasc DATE NOT NULL,
    finalidade VARCHAR(255) NOT NULL,
    abatido BOOLEAN NOT NULL,
    CONSTRAINT pk_ovino PRIMARY KEY (num_brinco),
    CONSTRAINT fk_mae_ovino FOREIGN KEY (brinco_mae) REFERENCES ovino(num_brinco)
);


CREATE TABLE IF NOT EXISTS pesagem (
    brinco_ovino VARCHAR(50) NOT NULL,
    peso NUMERIC(7, 3) NOT NULL,
    etapa_vida VARCHAR(255) NOT NULL,
    data_pesagem DATE NOT NULL,
    observacao VARCHAR(255) NULL,
    CONSTRAINT pk_pesagem PRIMARY KEY (brinco_ovino, data_pesagem),
    CONSTRAINT fk_pesagem_ovino FOREIGN KEY (brinco_ovino) REFERENCES ovino(num_brinco)
);


CREATE TABLE IF NOT EXISTS historico_medico (
    brinco_ovino VARCHAR(50) NOT NULL,
    doenca VARCHAR(255) NOT NULL,
    medicamento_aplicado VARCHAR(255) NULL,
    dose VARCHAR(50) NULL,                   -- pode ser em mg, ml, gramas, ...
    data_diagnostico DATE NOT NULL,
    responsavel VARCHAR(255) NOT NULL,
    observacao VARCHAR(255) NULL,
    CONSTRAINT pk_historico PRIMARY KEY (brinco_ovino, data_diagnostico),
    CONSTRAINT fk_historico_ovino FOREIGN KEY (brinco_ovino) REFERENCES ovino(num_brinco)
);


CREATE TABLE IF NOT EXISTS medicamento (
    id SERIAL NOT NULL,
    nome_produto VARCHAR(255) NOT NULL,
    data_aplicacao DATE NOT NULL,
    grupo_aplicacao VARCHAR(255) NOT NULL,
    CONSTRAINT pk_medicamento PRIMARY KEY (id)
);
