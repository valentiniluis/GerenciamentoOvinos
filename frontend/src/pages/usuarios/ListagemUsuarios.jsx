import { useState, useContext, useEffect } from 'react';
import { Link, useFetcher } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import PageTitle from '../../components/UI/PageTitle.jsx';
import CustomTable from '../../components/layout/table/CustomTable.jsx';
import TablePagination from '../../components/layout/table/TablePagination.jsx';
import FiltroUsuarios from '../../components/layout/forms/usuarios/FiltroUsuarios.jsx';
import ErrorParagraph from '../../components/UI/ErrorParagraph.jsx';
import ErrorPage from '../ErrorPage.jsx';
import { PermissionsContext } from '../../store/permissions-context.jsx';
import editIcon from '/edit_icon.svg';
import editDisabledIcon from '/edit_disabled.svg';
import { USER_SCHEMA } from '../../util/tableSchemas.js';

import api from '../../api/request';


const ListagemUsuarios = () => {
  const permissions = useContext(PermissionsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({ filterProp: 'nenhuma', filterValue: '' });
  const fetcher = useFetcher();
  const data = fetcher.data;

  useEffect(() => {
    const { filterProp, filterValue } = filter;
    const hasFilterSet = (filterProp !== 'nenhuma' && filterValue);
    let url = '/usuario/listar?page=' + currentPage;
    if (hasFilterSet) {
      const queryParam = `&${filterProp}=${filterValue}`;
      url += queryParam;
    }
    fetcher.load(url);
  }, [filter, currentPage])

  if (!permissions.perm_visual_grupos) return <ErrorPage title="Usuário não autorizado" />

  const isLoading = (fetcher.state === 'loading');
  const errorMessage = (data?.isError) ? data.message : null;
  const maxPages = data?.pages;

  // se o state de página atual é maior que a quantidade de páginas de dados consultados, 
  // retorna-se para a página 1. Para isso deve haver ao menos 1 página
  if (maxPages >= 1 && currentPage > maxPages) setCurrentPage(1);
  let usersData = (!data?.isError && data?.users?.length > 0) ? [...data.users] : [];
  if (usersData.length > 0 && permissions.perm_alter_usuario_grupo) {
    usersData = usersData.map(user => {
      const isAdmin = (user.grupo_nome === 'Administrador');
      const linkPath = (isAdmin) ? null : '/usuario/' + user.email;
      const linkIcon = (isAdmin) ? editDisabledIcon : editIcon;
      return {
        ...user, editar: (
          <Link to={linkPath}>
            <img src={linkIcon} alt="Ícone de editar usuário" className='edit-icon' />
          </Link>
        )
      }
    });
  }

  const schema = [...USER_SCHEMA];
  if (permissions.perm_alter_usuario_grupo) schema.push(['editar', 'Editar']);

  return (
    <>
      <PageTitle title="Listagem de Usuários" />
      <section className="form-cont flex-center">
        <FiltroUsuarios filter={filter} updateFilter={setFilter} />
      </section>
      {isLoading ? (
        <div className='spinner-container'>
          <Spinner variant='primary' animation='border' role='status' />
        </div>
      ) : errorMessage ? <ErrorParagraph error={{ message: errorMessage }} />
        : (
          <div className="row py-3">
            {usersData.length > 0 ? (
              <>
                <CustomTable schema={schema} data={usersData} uniqueCol="email" />
                <TablePagination pages={{ current: currentPage, max: maxPages }} updatePage={setCurrentPage} />
              </>
            )
              : <ErrorParagraph error={{ message: 'Nenhum usuário encontrado' }} />}
          </div>
        )
      }
    </>
  );
};

export default ListagemUsuarios;


export const loader = async ({ request }) => {
  try {
    // extrair os search/query params e copiá-los para a URL da API Back-End
    const loaderQueryParams = new URL(request.url).search;
    const url = '/usuarios' + loaderQueryParams;
    const response = await api.get(url);
    const data = response.data;
    return data;
  } catch (err) {
    return {
      isError: true,
      message: err.response?.data?.message || 'Falha ao carregar usuarios'
    };
  }
}