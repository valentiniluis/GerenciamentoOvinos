import { Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import FormRow from '../../components/UI/FormRow';
import InputField from '../../components/UI/InputField';
import PageTitle from '../../components/UI/PageTitle';
import CustomTable from '../../components/layout/table/CustomTable';
import FormBtn from '../../components/UI/FormBtn';
import RenderFields from '../../components/layout/forms/RenderFields';

import api from '../../api/request';

const ListagemUsuarios = () => {
  const schema = [
    ['nome', 'Nome'],
    ['email', 'E-Mail'],
    ['grupo', 'Grupo'],
    ['data_cadastro', 'Data de Cadastro'],
  ];

  const [usersData, setUsersData] = useState([]);
  // const [filterProp, setFilterProp] = useState('');
  // const [queryParam, setQueryParam] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/usuarios');
        const data = response.data;
        setUsersData(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  // const handleSelect = (event) => {
  //   setFilterProp(event.target.value);
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const filterValue = formData.get(filterProp);
  //   setQueryParam(`${filterProp}=${filterValue}`);
  // }

  // const inputFilter = [{
  //   wrapper: {
  //     size: 'large-input',

  //   },
  //   inputProps: {
  //     label: 'Condição de Filtro (Opcional)',
  //     id: 'filtro',
  //     name: 'filtro',
  //     onChange: handleSelect,
  //     options: [
  //       { value: 'nenhuma', name: 'Nenhuma' },
  //       { value: 'email', name: 'E-Mail' },
  //       { value: 'nome', name: 'Nome' }
  //     ]
  //   }
  // }];

  return (
    <>
      <PageTitle title="Listagem de Usuários" />
      {/* <div className="form-cont flex-center">
        <form className="medium-input" onSubmit={handleSubmit}>
          <RenderFields fields={inputFilter} />
          {filterProp === 'nenhuma' ? null : (
            <>
            </>
          )}
        </form>
      </div> */}
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
