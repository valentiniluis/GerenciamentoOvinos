import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/UI/PageTitle';
import CustomTable from '../../components/layout/table/CustomTable';
import FiltroGrupos from '../../components/layout/forms/grupos/FiltroGrupos';
import editIcon from '/edit_icon.svg';
import ErrorParagraph from '../../components/UI/ErrorParagraph';


const SCHEMA = [
  ['nome', 'Nome do Grupo'],
  ['descricao', 'Descrição'],
  ['data_criacao', 'Data de Criação'],
  ['membros', 'Nº de Membros'],
  ['editar', 'Editar']
];


const ListagemUsuarios = () => {
  const [groupsData, setGroupsData] = useState([]);
  const [errorMessage, setErrorMessage] = useState();


  const updateGroupsData = (data) => {
    if (data?.isError) {
      setErrorMessage(data.message);
      return;
    }
    const updatedGroupsData = data.map(group => ({
      ...group, editar: (
        <Link to={`/grupo/${group.nome}/editar`}>
          <img src={editIcon} alt="Ícone de editar grupo" className='edit-icon' />
        </Link>
      )
    }));
    setGroupsData(updatedGroupsData);
  }


  return (
    <>
      <PageTitle title="Grupos de Usuários" />
      {errorMessage ? <ErrorParagraph error={{ message: errorMessage }} />
        : (
          <>
            <section className="form-cont flex-center">
              <FiltroGrupos updateGroupsData={updateGroupsData} />
            </section>
            <div className="row py-3">
              {groupsData.length > 0 ? (
                <CustomTable schema={SCHEMA} data={groupsData} uniqueCol="nome" />
              ) : (
                <h3 className="text-center">Nenhuma informação cadastrada</h3>
              )}
            </div>
          </>
        )}
    </>
  );
};

export default ListagemUsuarios;
