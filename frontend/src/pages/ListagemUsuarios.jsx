import { Form, Button } from 'react-bootstrap';
import Sidebar from '../components/layout/sidebar/Sidebar';
import FormRow from '../components/UI/FormRow';
import InputField from '../components/UI/InputField';
import PageTitle from '../components/UI/PageTitle';
import CustomTable from '../components/layout/table/CustomTable';
import { useEffect, useState } from 'react';

const ListagemUsuarios = () => {
  const schema = [
    ['nome', 'Nome'],
    ['email', 'E-Mail'],
    ['grupo', 'Grupo'],
    ['data_cadastro', 'Data de Cadastro'],
  ];

  const [usersData, setUsersData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const url = 'http://localhost:3000/usuarios';
        const headers = { 'Content-Type': 'application/json' };
        const response = await fetch(url, headers);
        if (!response.ok)
          throw new Error('Não foi possível consultar os dados');
        const data = await response.json();
        setUsersData(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const handleSelect = (event) => {
    setFilter(event.target.value);
  };

  const inputFilter = {
    label: 'Condição de Filtro (Opcional)',
    size: 'medium-input',
    element: (
      <Form.Select id="filtro" name="filtro" onChange={handleSelect} >
        <option>Nenhuma</option>
        <option value="email">E-Mail</option>
        <option value="nome">Nome</option>
      </Form.Select>
    )
  }

  return (
    <div className="row m-0">
      <Sidebar user="Luís" currentPage="Usuários" />
      <main className="col cont px-5">
        <PageTitle title="Listagem de Usuários" />
        <div className="form-cont">
          <form className="flex-center" action={null}>
            <InputField label={inputFilter.label} input={inputFilter.element} size={inputFilter.size} />
            {filter !== 'nome' && filter !== 'email' ? null : (
              <>
                <FormRow padding={'py-3'}>
                  {filter === 'nome' ? (
                    <InputField
                      label={'Nome'}
                      input={<Form.Control id="nome" name="nome" />}
                      size={'medium-input'}
                    />
                  ) : (
                    <InputField
                      label={'E-Mail'}
                      input={<Form.Control type="email" id="email" name="email" />}
                      size={'medium-input'}
                    />
                  )}
                </FormRow>
                <Button variant='primary' className='filter-btn' type='submit'>
                  Filtrar
                </Button>
              </>
            )}
          </form>
        </div>
        <div className="row py-3">
          {usersData.length > 0 ? (
            <CustomTable schema={schema} data={usersData} uniqueCol={'email'} />
          ) : (
            <h3 className="text-center">Nenhuma informação cadastrada</h3>
          )}
        </div>
      </main>
    </div>
  );
};

export default ListagemUsuarios;
