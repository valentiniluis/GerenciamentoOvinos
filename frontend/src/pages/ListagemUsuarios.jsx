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
  
  return (
    <div className="row m-0">
      <Sidebar user='Luís' currentPage='Usuários' />
      <main className="col cont px-5">
        <PageTitle title="Listagem de Usuários" />
        <form action={null}>
        </form>
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