import { useState } from 'react';
import PageTitle from '../../components/UI/PageTitle';
import CustomTable from '../../components/layout/table/CustomTable';
import FiltroGrupos from '../../components/layout/forms/grupos/FiltroGrupos';


const ListagemUsuarios = () => {
  const schema = [
    ['nome', 'Nome do Grupo'],
    ['descricao', 'Descrição'],
    ['data_criacao', 'Data de Criação'],
    ['membros', 'Nº de Membros']
  ];

  const [groupsData, setGroupsData] = useState([]);

  return (
    <>
      <PageTitle title="Grupos de Usuários" />
      <section className="form-cont flex-center">
        <FiltroGrupos updateGroupsData={setGroupsData} />
      </section>
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
