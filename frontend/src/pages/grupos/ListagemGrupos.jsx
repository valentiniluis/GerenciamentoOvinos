import { useEffect, useState } from 'react';
import PageTitle from '../../components/UI/PageTitle';
import CustomTable from '../../components/layout/table/CustomTable';

import api from '../../api/request';

const ListagemUsuarios = () => {
  const schema = [
    ['nome', 'Nome do Grupo'],
    ['descricao', 'Descrição'],
    ['data_criacao', 'Data de Criação'],
    ['membros', 'Nº de Membros']
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
    <>
      <PageTitle title="Grupos de Usuários" />
      <div className="row py-3">
        {groupsData.length > 0 ? (
          <CustomTable schema={schema} data={groupsData} uniqueCol={'nome'} />
        ) : (
          <h3 className="text-center">Nenhuma informação cadastrada</h3>
        )}
      </div>
    </>
  );
};

export default ListagemUsuarios;
