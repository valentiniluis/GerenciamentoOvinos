
export const FILTER_TYPES = {
  nome: {
    placeholder: 'Insira um nome...',
    id: 'nome',
    name: 'nome'
  },
  email: {
    placeholder: 'Insira um e-mail...',
    id: 'email',
    name: 'email'
  },
  descricao: {
    placeholder: 'Insira uma descrição...',
    id: 'descricao',
    name: 'descricao'
  },
  brinco_num: {
    placeholder: 'Insira um número de brinco...',
    id: 'brinco_num',
    name: 'brinco_num',
  },
  brinco_mae: {
    placeholder: 'Insira um número de brinco...',
    id: 'brinco_mae',
    name: 'brinco_mae',
  },
  raca: {
    placeholder: 'Insira uma raça de ovino...',
    id: 'raca',
    name: 'raca',
  },
  sexo: {
    id: 'sexo',
    name: 'sexo',
    options: [
      { value: "", hidden: true, name: "Selecione o sexo..." },
      { value: "M", name: "Macho" },
      { value: "F", name: "Fêmea" },
    ],
  },
  finalidade: {
    id: 'finalidade',
    name: 'finalidade',
    options: [
      { value: '', hidden: true, name: 'Selecione a finalidade...' },
      { value: 'Reprodução', name: 'Reprodução' },
      { value: 'Abate', name: 'Abate' },
      { value: 'Venda', name: 'Venda' },
      { value: 'Leite', name: 'Leite' },
      { value: 'Outra', name: 'Outra' },
    ]
  },
  abatido: {
    id: 'abatido',
    name: 'abatido',
    options: [
      { value: '', hidden: true, name: 'Selecione uma opção...' },
      { value: true, name: 'Ovinos Abatidos' },
      { value: false, name: 'Ovinos Não Abatidos' },
    ]
  }
}

export const filtroOvinos = [{
  wrapper: {
    size: 'large-input'
  },
  inputProps: {
    label: 'Condição de Filtro (Opcional)',
    id: 'filtro',
    name: 'filtro',
    options: [
      { value: 'nenhuma', name: 'Nenhuma' },
      { value: 'brinco_num', name: 'Brinco do Ovino' },
      { value: 'brinco_mae', name: 'Brinco da Mãe do Ovino' },
      { value: 'raca', name: 'Raça' },
      { value: 'sexo', name: 'Sexo' },
      { value: 'finalidade', name: 'Finalidade' },
      { value: 'abatido', name: 'Abatido' }
    ]
  }
}];

export const filtroGrupos = [{
  wrapper: {
    size: 'large-input'
  },
  inputProps: {
    label: 'Condição de Filtro (Opcional)',
    id: 'filtro',
    name: 'filtro',
    options: [
      { value: 'nenhuma', name: 'Nenhuma' },
      { value: 'nome', name: 'Nome do Grupo' },
      { value: 'descricao', name: 'Descrição' }
    ]
  }
}];

export const filtroUsuarios = [{
  wrapper: {
    size: 'large-input'
  },
  inputProps: {
    label: 'Condição de Filtro (Opcional)',
    id: 'filtro',
    name: 'filtro',
    options: [
      { value: 'nenhuma', name: 'Nenhuma' },
      { value: 'email', name: 'E-Mail' },
      { value: 'nome', name: 'Nome' }
    ]
  }
}];
