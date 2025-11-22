import { useQuery } from '@tanstack/react-query';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import PageTitle from '../../components/UI/PageTitle.jsx';
import CustomTable from '../../components/layout/table/CustomTable.jsx';
import ErrorParagraph from '../../components/UI/ErrorParagraph.jsx';
import Filtro from '../../components/layout/forms/Filtro.jsx';
import TablePagination from '../../components/layout/table/TablePagination.jsx';
import ErrorPage from '../ErrorPage.jsx';
import editIcon from '/edit_icon.svg';
import { PermissionsContext } from '../../store/permissions-context';
import { SHEEP_SCHEMA } from '../../util/tableSchemas.js';
import { getFilteredList } from '../../util/loaders.js';


const initialState = {
  attribute: "nenhuma",
  value: ""
};

const ListagemRebanho = () => {
  const permissions = useContext(PermissionsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(initialState);

  const { data, isError, error, isPending } = useQuery({
    queryKey: ['rebanho', { page: currentPage }, filter],
    queryFn: getFilteredList,
    enabled: permissions.perm_visual_rebanho
  });

  if (!permissions.perm_visual_rebanho) return <ErrorPage title="Usuário não autorizado" />;

  let content;
  if (isPending) {
    content = (
      <div className='spinner-container'>
        <Spinner variant='primary' animation='border' role='status' />
      </div>
    );
  }
  else if (isError || !data?.sheep?.length) {
    content = <ErrorParagraph error={{ message: error?.message || "Nenhum ovino cadastrado" }} />
  }
  else if (data) {
    const schema = [...SHEEP_SCHEMA];
    const { pages, sheep } = data;
    if (permissions.perm_alter_rebanho) schema.push(['editar', 'Editar']);
    const sheepData = sheep.map(obj => {
      const updatedData = { ...obj };
      const brinco = updatedData['brinco_num'];
      updatedData['pesagens'] = (
        <Link className="my-link" to={`/rebanho/${brinco}`}>
          Acessar
        </Link>
      );

      if (permissions.perm_alter_rebanho) updatedData['editar'] = (
        <Link className="my-link" to={`/rebanho/${brinco}/editar`}>
          <img src={editIcon} alt="Ícone para Editar Ovino" className='edit-icon' />
        </Link>
      );
      return updatedData;
    });

    content = (
      <div className="row py-3">
        <CustomTable schema={schema} data={sheepData} uniqueCol="brinco_num" />
        <TablePagination pages={{ current: currentPage, max: pages }} updatePage={setCurrentPage} />
      </div>
    );
  }

  return (
    <>
      <PageTitle title="Listagem Rebanho" />
      <section className="form-cont flex-center">
        <Filtro
          filter={filter}
          setFilter={setFilter}
          setPage={setCurrentPage}
          type="rebanho"
        />
      </section>
      {content}
    </>
  );
};

export default ListagemRebanho;