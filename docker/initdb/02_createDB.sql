CREATE TABLE IF NOT EXISTS grupo (
  nome VARCHAR(255) NOT NULL,
  descricao VARCHAR(255) NULL,
  data_criacao DATE NOT NULL,
  perm_visual_rebanho BOOLEAN NOT NULL,
  perm_visual_calendario BOOLEAN NOT NULL,
  perm_visual_grupos BOOLEAN NOT NULL,
  perm_alter_rebanho BOOLEAN NOT NULL,
  perm_alter_calendario BOOLEAN NOT NULL,
  perm_alter_usuario_grupo BOOLEAN NOT NULL,
  CONSTRAINT pk_grupo PRIMARY KEY (nome)
);

CREATE TABLE IF NOT EXISTS usuario (
  email VARCHAR(255) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  grupo_nome VARCHAR(255) NOT NULL,
  data_cadastro DATE NOT NULL,
  CONSTRAINT pk_usuario PRIMARY KEY (email),
  CONSTRAINT fk_usuario_grupo FOREIGN KEY (grupo_nome) REFERENCES grupo(nome) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tarefa (
  data_criacao DATE NOT NULL,
  tarefa_nome VARCHAR(255) NOT NULL,
  descricao VARCHAR(255) NULL,
  usuario_email VARCHAR(255) NOT NULL,
  CONSTRAINT pk_tarefa PRIMARY KEY (data_criacao, tarefa_nome),
  CONSTRAINT fk_tarefa_usuario FOREIGN KEY (usuario_email) REFERENCES usuario(email) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ovino (
  brinco_num VARCHAR(255) NOT NULL,
  brinco_mae VARCHAR(255) NULL,
  usuario_email VARCHAR(255) NOT NULL,
  raca VARCHAR(255) NOT NULL,
  sexo CHAR NOT NULL,
  peso_nascimento NUMERIC(7,3) NOT NULL,
  data_nascimento DATE NOT NULL,
  finalidade VARCHAR(255) NOT NULL,
  abatido BOOLEAN NOT NULL,
  CONSTRAINT pk_ovino PRIMARY KEY (brinco_num),
  CONSTRAINT fk_ovino_mae FOREIGN KEY (brinco_mae) REFERENCES ovino(brinco_num) ON DELETE CASCADE,
  CONSTRAINT fk_ovino_usuario FOREIGN KEY (usuario_email) REFERENCES usuario(email) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pesagem (
  ovino_brinco VARCHAR(255) NOT NULL,
  peso NUMERIC(7,3) NOT NULL,
  etapa_vida VARCHAR(255) NOT NULL,
  data_pesagem DATE NOT NULL,
  observacao VARCHAR(255),
  CONSTRAINT pk_pesagem PRIMARY KEY (ovino_brinco, data_pesagem),
  CONSTRAINT fk_pesagem_ovino FOREIGN KEY (ovino_brinco) REFERENCES ovino(brinco_num) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS historico_medico (
  doenca_nome VARCHAR(255) NOT NULL,
  responsavel_tratamento VARCHAR(255) NOT NULL,
  observacao VARCHAR(255),
  CONSTRAINT pk_historico_medico PRIMARY KEY (doenca_nome)
);

CREATE TABLE IF NOT EXISTS historico_animal (
  doenca_nome VARCHAR(255) NOT NULL,
  ovino_brinco VARCHAR(255) NOT NULL,
  data_registro DATE NOT NULL,
  dose NUMERIC(7,3) NOT NULL,
  medicamento_nome VARCHAR(255) NOT NULL,
  CONSTRAINT pk_historico_animal PRIMARY KEY (data_registro, ovino_brinco, doenca_nome),
  CONSTRAINT fk_historico_animal_medico FOREIGN KEY (doenca_nome) REFERENCES historico_medico(doenca_nome) ON DELETE CASCADE,
  CONSTRAINT fk_historico_animal_ovino FOREIGN KEY (ovino_brinco) REFERENCES ovino(brinco_num) ON DELETE CASCADE
);
