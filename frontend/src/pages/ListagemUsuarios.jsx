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
        if (!response.ok) throw new Error("Não foi possível consultar os dados");
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
  }

  return (
    <div className="row m-0">
      <Sidebar user='Luís' currentPage='Usuários' />
      <main className="col cont px-5">
        <PageTitle title="Listagem de Usuários" />
        <div className="form-cont">
          <form className='flex-center' action={null}>
            <label className="my-label d-block text-center" htmlFor="filtro">Condição de Filtro (Opcional)</label>
            <select className='my-select' name="filtro" id="filtro" onChange={handleSelect}>
              <option>Nenhuma</option>
              <option value="email">E-Mail</option>
              <option value="nome">Nome</option>
            </select>
            {filter !== 'nome' && filter !== 'email'
              ? null
              : (
                <FormRow padding={'py-3'}>
                  {
                    filter === 'nome'
                      ? <InputField label={'Nome'} input={<input id='nome' name='nome' className='form-input' />} size={'medium-input'} />
                      : <InputField label={'E-Mail'} input={<input type='email' id='email' name='email' className='form-input' />} size={'medium-input'} />
                  }
                </FormRow>
              )
            }
          </form>

        </div>
        <div className="row py-3">
          {(usersData.length > 0)
            ? <CustomTable schema={schema} data={usersData} uniqueCol={'email'} />
            : <h3 className='text-center'>Nenhuma informação cadastrada</h3>
          }
        </div>
      </main>
    </div>
  )
}

export default ListagemUsuarios;