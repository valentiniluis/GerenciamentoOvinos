import { useState, useContext, useEffect } from 'react';
import { Link, useFetcher } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import PageTitle from '../../components/UI/PageTitle';
import CustomTable from '../../components/layout/table/CustomTable';
import FiltroGrupos from '../../components/layout/forms/grupos/FiltroGrupos';
import ErrorParagraph from '../../components/UI/ErrorParagraph';
import ErrorPage from '../ErrorPage';
import { PermissionsContext } from '../../store/permissions-context';
import editIcon from '/edit_icon.svg';
import editDisabledIcon from '/edit_disabled.svg';
import { GROUP_SCHEMA } from '../../util/tableSchemas.js';

import api from '../../api/request.js';


const ListagemGrupos = () => {
  const permissions = useContext(PermissionsContext);
  const [filter, setFilter] = useState({ filterProp: 'nenhuma', filterValue: '' });
  const fetcher = useFetcher();
  const data = fetcher.data;

  const isLoading = (fetcher.state === 'loading');
  const errorMessage = (data?.isError) ? data.message : null;
  let groupsData = (!data?.isError && data?.length > 0) ? [...data] : [];
  if (groupsData.length > 0 && permissions.perm_alter_usuario_grupo) {
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

  useEffect(() => {
    const { filterProp, filterValue } = filter;
    const hasFilterSet = (filterProp !== 'nenhuma' && filterValue);
    const baseURL = '/grupo/listar';
    const url = (hasFilterSet) ? `${baseURL}?${filterProp}=${filterValue}` : baseURL;
    fetcher.load(url);
  }, [filter]);

  if (!permissions.perm_visual_grupos) return <ErrorPage title="Usuário não autorizado" />;

  const schema = [...GROUP_SCHEMA];
  if (permissions.perm_alter_usuario_grupo) schema.push(['editar', 'Editar']);

  return (
    <>
      <PageTitle title="Grupos de Usuários" />
      <section className="form-cont flex-center">
        <FiltroGrupos filter={filter} updateFilter={setFilter} />
      </section>
      {isLoading ? (
        <div className='spinner-container'>
          <Spinner variant='primary' animation='border' role='status' />
        </div>
      ) : errorMessage ? <ErrorParagraph error={{ message: errorMessage }} />
        : (
          <div className="row py-3">
            {groupsData.length > 0
              ? <CustomTable schema={schema} data={groupsData} uniqueCol="nome" />
              : <ErrorParagraph error={{ message: 'Nenhum grupo encontrado' }} />
            }
          </div>
        )}
    </>
  );
};

export default ListagemGrupos;


export const loader = async ({ request }) => {
  try {
    // extrair os search/query params e copiá-los para a URL da API Back-End
    const loaderQueryParams = new URL(request.url).search;
    const url = '/grupos' + loaderQueryParams;
    const response = await api.get(url);
    const data = response.data;
    return data;
  } catch (err) {
    return {
      isError: true,
      message: err.response?.data?.message || 'Falha ao carregar grupos'
    };
  }
}