import { useState, useContext, useEffect } from 'react';
import { useFetcher } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import PageTitle from '../../components/UI/PageTitle.jsx';
import CustomTable from '../../components/layout/table/CustomTable.jsx';
import ErrorParagraph from '../../components/UI/ErrorParagraph.jsx';
import FiltroOvinos from '../../components/layout/forms/rebanho/FiltroOvinos.jsx';
import TablePagination from '../../components/layout/table/TablePagination.jsx';
import ErrorPage from '../ErrorPage.jsx';
import editIcon from '/edit_icon.svg';
import { PermissionsContext } from '../../store/permissions-context';
import { SHEEP_SCHEMA } from '../../util/tableSchemas.js';

import api from '../../api/request.js';


const ListagemRebanho = () => {
  const permissions = useContext(PermissionsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({ filterProp: 'nenhuma', filterValue: '' });
  const fetcher = useFetcher();
  const data = fetcher.data;

  useEffect(() => {
    const { filterProp, filterValue } = filter;
    const hasFilterSet = (filterProp !== 'nenhuma' && filterValue);
    let url = '/rebanho/listar?page=' + currentPage;
    if (hasFilterSet) {
      const queryParam = `&${filterProp}=${filterValue}`;
      url += queryParam;
    }
    fetcher.load(url);
  }, [filter, currentPage]);

  if (!permissions.perm_visual_rebanho) return <ErrorPage title="Usuário não autorizado" />;

  const isLoading = (fetcher.state === 'loading');
  const errorMessage = (data?.isError) ? data.message : null;
  const maxPages = data?.pages;

  // se o state de página atual é maior que a quantidade de páginas de dados consultados, 
  // retorna-se para a página 1. Para isso deve haver ao menos 1 página
  if (maxPages >= 1 && currentPage > maxPages) setCurrentPage(1);
  let sheepData = (!data?.isError && data?.sheep?.length > 0) ? [...data.sheep] : [];
  if (sheepData.length > 0) {
    sheepData = sheepData.map(obj => {
      const updatedData = { ...obj };
      const brinco = updatedData['brinco_num'];
      updatedData['pesagens'] = (
        <Link className="my-link" to={`/rebanho/${brinco}`}>
          Acessar
        </Link>
      );

      if (!permissions.perm_alter_rebanho) return updatedData;
      updatedData['editar'] = (
        <Link className="my-link" to={`/rebanho/${brinco}/editar`}>
          <img src={editIcon} alt="Ícone para Editar Ovino" className='edit-icon' />
        </Link>
      );
      return updatedData;
    });
  }

  const schema = [...SHEEP_SCHEMA];
  if (permissions.perm_alter_rebanho) schema.push(['editar', 'Editar']);

  return (
    <>
      <PageTitle title="Listagem Rebanho" />
      <section className="form-cont flex-center">
        <FiltroOvinos filter={filter} updateFilter={setFilter} />
      </section>
      {isLoading ? (
        <div className='spinner-container'>
          <Spinner variant='primary' animation='border' role='status' />
        </div>
      ) : errorMessage ? <ErrorParagraph error={{ message: errorMessage }} />
        : (
          <div className="row py-3">
            {sheepData.length > 0
              ? (
                <>
                  <CustomTable schema={schema} data={sheepData} uniqueCol="brinco_num" />
                  <TablePagination pages={{ current: currentPage, max: maxPages }} updatePage={setCurrentPage} />
                </>
              )
              : <ErrorParagraph error={{ message: "Nenhum ovino cadastrado" }} />}
          </div>
        )
      }
    </>
  );
};

export default ListagemRebanho;


export const loader = async ({ request }) => {
  try {
    // extrair os search/query params e copiá-los para a URL da API Back-End
    const loaderQueryParams = new URL(request.url).search;
    const url = '/rebanho' + loaderQueryParams;
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
