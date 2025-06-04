import { useEffect, useState } from 'react';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import PageTitle from '../../components/UI/PageTitle';
import CustomTable from '../../components/layout/table/CustomTable';

import api from '../../api/request';

const ListagemUsuarios = () => {
  const schema = [
    ['nome_grupo', 'Nome do Grupo'],
    ['data_criacao', 'Data de Criação'],
    ['num_membros', 'Nº de Membros'],
    ['permissoes', 'Permissões']
  ];

  const [groupsData, setGroupsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/grupos');
        const data = response.data;
        setGroupsData(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="row m-0">
      <Sidebar user="Luís" currentPage="Grupos" />
      <main className="col cont px-5">
        <PageTitle title="Grupos de Usuários" />
        <div className="row py-3">
          {groupsData.length > 0 ? (
            <CustomTable schema={schema} data={groupsData} uniqueCol={'nome_grupo'} />
          ) : (
            <h3 className="text-center">Nenhuma informação cadastrada</h3>
          )}
        </div>
      </main>
    </div>
  );
};

export default ListagemUsuarios;
