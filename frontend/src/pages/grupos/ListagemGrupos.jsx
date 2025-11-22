import { useQuery } from '@tanstack/react-query';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import PageTitle from '../../components/UI/PageTitle';
import CustomTable from '../../components/layout/table/CustomTable';
import Filtro from '../../components/layout/forms/Filtro.jsx';
import ErrorParagraph from '../../components/UI/ErrorParagraph';
import ErrorPage from '../ErrorPage';
import { PermissionsContext } from '../../store/permissions-context';
import editIcon from '/edit_icon.svg';
import editDisabledIcon from '/edit_disabled.svg';
import { GROUP_SCHEMA } from '../../util/tableSchemas.js';
import { getFilteredList } from '../../util/loaders.js';
import TablePagination from '../../components/layout/table/TablePagination.jsx';


const initialState = {
  attribute: "nenhuma",
  value: ""
};

const ListagemGrupos = () => {
  const permissions = useContext(PermissionsContext);
  const [filter, setFilter] = useState(initialState);
  const [currentPage, setCurrentPage] = useState(1);

  
  const { data, isError, error, isPending } = useQuery({
    queryKey: ['grupos', { page: currentPage }, filter],
    queryFn: getFilteredList,
    enabled: permissions.perm_visual_grupos
  });

  if (!permissions.perm_visual_grupos) return <ErrorPage title="Usuário não autorizado" />;

  let content;
  if (isPending) {
    content = (
      <div className='spinner-container'>
        <Spinner variant='primary' animation='border' role='status' />
      </div>
    );
  }
  else if (isError || !data?.groups?.length) {
    content = <ErrorParagraph error={{ message: error?.message || "Nenhum grupo encontrado" }} />
  }
  else if (data) {
    const { groups, pages } = data;
    const schema = [...GROUP_SCHEMA];
    let groupsData = [...groups];

    if (permissions.perm_alter_usuario_grupo) {
      schema.push(['editar', 'Editar'])
      groupsData = groupsData.map(group => {
        const isAdmin = (group.nome === 'Administrador');
        const linkPath = (isAdmin) ? null : '/grupo/' + group.nome;
        const linkIcon = (isAdmin) ? editDisabledIcon : editIcon;
        const editar = (
          <Link to={linkPath}>
            <img src={linkIcon} alt="Ícone de editar grupo" className='edit-icon' />
          </Link>
        );
        return { ...group, editar };
      });
    }

    content = (
      <div className="row py-3">
        <CustomTable schema={schema} data={groupsData} uniqueCol="nome" />
        <TablePagination pages={pages} updatePage={setCurrentPage} />
      </div>
    );
  }

  return (
    <>
      <PageTitle title="Grupos de Usuários" />
      <section className="form-cont flex-center">
        <Filtro
          filter={filter}
          setFilter={setFilter}
          setPage={setCurrentPage}
          type="grupos"
        />
      </section>
      {content}
    </>
  );
};

export default ListagemGrupos;