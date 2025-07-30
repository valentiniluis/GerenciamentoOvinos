export const GROUP_SCHEMA = [
  ['nome', 'Nome do Grupo'],
  ['descricao', 'Descrição'],
  ['data_criacao', 'Data de Criação'],
  ['membros', 'Nº de Membros']
];


export const USER_SCHEMA = [
  ['nome', 'Nome'],
  ['email', 'E-Mail'],
  ['grupo_nome', 'Grupo'],
  ['data_cadastro', 'Data de Cadastro'],
];


export const SHEEP_SCHEMA = [
  ['brinco_num', 'Nº do Brinco'],
  ['brinco_mae', 'Nº Brinco Mãe'],
  ['data_nascimento', 'Nascimento'],
  ['raca', 'Raça'],
  ['sexo', 'Sexo'],
  ['finalidade', 'Finalidade'],
  ['abatido', 'Abatido'],
  ['pesagens', 'Pesagens']
];


export const SHEEP_WEIGHT_SCHEMA = [
  ['ovino_brinco', 'Nº do Brinco'],
  ['etapa_vida', 'Etapa da Vida'],
  ['peso', 'Peso (kg)'],
  ['data_pesagem', 'Data da Pesagem'],
  ['observacao', 'Observação']
];
