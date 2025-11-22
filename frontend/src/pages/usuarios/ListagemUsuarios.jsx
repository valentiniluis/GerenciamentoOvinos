import { useQuery } from '@tanstack/react-query';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import PageTitle from '../../components/UI/PageTitle.jsx';
import CustomTable from '../../components/layout/table/CustomTable.jsx';
import TablePagination from '../../components/layout/table/TablePagination.jsx';
import Filtro from '../../components/layout/forms/Filtro.jsx';
import ErrorParagraph from '../../components/UI/ErrorParagraph.jsx';
import ErrorPage from '../ErrorPage.jsx';
import { PermissionsContext } from '../../store/permissions-context.jsx';
import editIcon from '/edit_icon.svg';
import editDisabledIcon from '/edit_disabled.svg';
import { USER_SCHEMA } from '../../util/tableSchemas.js';
import { getFilteredList } from '../../util/loaders.js';

const initialState = {
  attribute: "nenhuma",
  value: ""
};

const ListagemUsuarios = () => {
  const permissions = useContext(PermissionsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(initialState);

  const { data, isError, error, isPending } = useQuery({
    queryKey: ['usuarios', { page: currentPage }, filter],
    queryFn: getFilteredList,
    enabled: permissions.perm_visual_grupos
  });

  if (!permissions.perm_visual_grupos) return <ErrorPage title="Usuário não autorizado" />

  let content;
  if (isPending) {
    content = (
      <div className='spinner-container'>
        <Spinner variant='primary' animation='border' role='status' />
      </div>
    );
  }
  else if (isError || !data?.users?.length) {
    content = <ErrorParagraph error={{ message: error?.message || "Nenhum usuário encontrado" }} />
  }
  else if (data) {
    const schema = [...USER_SCHEMA];
    const { pages, users } = data;
    let usersData = [...users];
    if (permissions.perm_alter_usuario_grupo) {
      schema.push(['editar', 'Editar']);
      usersData = usersData.map(user => {
        const isAdmin = (user.grupo_nome === 'Administrador');
        const linkPath = (isAdmin) ? null : '/usuario/' + user.email;
        const linkIcon = (isAdmin) ? editDisabledIcon : editIcon;
        return {
          ...user,
          editar: (
            <Link to={linkPath}>
              <img src={linkIcon} alt="Ícone de editar usuário" className='edit-icon' />
            </Link>
          )
        };
      });

      content = (
        <div className="row py-3">
          <CustomTable schema={schema} data={usersData} uniqueCol="email" />
          <TablePagination pages={{ current: currentPage, max: pages }} updatePage={setCurrentPage} />
        </div>
      );
    }
  }


  return (
    <>
      <PageTitle title="Listagem de Usuários" />
      <section className="form-cont flex-center">
        <Filtro
          filter={filter}
          setFilter={setFilter}
          setPage={setCurrentPage}
          type="usuarios"
        />
      </section>
      {content}
    </>
  );
};

export default ListagemUsuarios;