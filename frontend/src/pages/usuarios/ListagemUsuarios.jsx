import { useEffect, useState } from 'react';
import PageTitle from '../../components/UI/PageTitle';
import CustomTable from '../../components/layout/table/CustomTable';
import RenderFields from '../../components/layout/forms/RenderFields';
import InputFilter from '../../components/layout/forms/InputFilter';

import api from '../../api/request';

const FILTER = {
  filterProp: 'Nenhuma',
  filterValue: ''
};

const FILTER_INPUT_TYPES = {
  nome: {
    placeholder: 'Insira um nome...',
    id: 'nome',
    name: 'name'
  },
  email: {
    placeholder: 'Insira um e-mail...',
    id: 'email',
    name: 'email'
  }
}

const ListagemUsuarios = () => {
  const schema = [
    ['nome', 'Nome'],
    ['email', 'E-Mail'],
    ['grupo', 'Grupo'],
    ['data_cadastro', 'Data de Cadastro'],
  ];

  const [usersData, setUsersData] = useState([]);
  const [filter, setFilter] = useState(FILTER);

  useEffect(() => {
    async function fetchData() {
      const { filterProp, filterValue } = filter;
      if (filterProp !== 'Nenhuma' && !filterValue) return;
      try {
        const queryParam = `?${filterProp}=${filterValue}`;
        const fullURL = '/usuarios' + queryParam;
        const response = await api.get(fullURL);
        const data = response.data;
        setUsersData(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [filter]);

  const handleSelect = (event) => {
    setFilter({ filterProp: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const filterValue = formData.get(filter.filterProp);
    setFilter(prevFilter => ({ ...prevFilter, filterValue }));
  }

  const inputFilter = [{
    wrapper: {
      size: 'large-input'
    },
    inputProps: {
      label: 'Condição de Filtro (Opcional)',
      id: 'filtro',
      name: 'filtro',
      onChange: handleSelect,
      options: [
        { value: 'nenhuma', name: 'Nenhuma' },
        { value: 'email', name: 'E-Mail' },
        { value: 'nome', name: 'Nome' }
      ]
    }
  }];

  const noFilterApplied = filter.filterProp === 'Nenhuma';
  const inputFilterProps = noFilterApplied ? null
    : FILTER_INPUT_TYPES[filter.filterProp];

  return (
    <>
      <PageTitle title="Listagem de Usuários" />
      <div className="form-cont flex-center">
        <form className="medium-input" onSubmit={handleSubmit}>
          <RenderFields fields={inputFilter} />
          {noFilterApplied ? null : (
            <div className="py-4">
              <InputFilter {...inputFilterProps} />
            </div>
          )
          }
        </form>
      </div>
      <div className="row py-3">
        {usersData.length > 0 ? (
          <CustomTable schema={schema} data={usersData} uniqueCol={'email'} />
        ) : (
          <h3 className="text-center">Nenhuma informação cadastrada</h3>
        )}
      </div>
    </>
  );
};

export default ListagemUsuarios;
