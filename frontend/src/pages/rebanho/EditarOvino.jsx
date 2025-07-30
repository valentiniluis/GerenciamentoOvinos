import { useContext } from 'react';
import { useFetcher, useLoaderData, Link } from 'react-router-dom';
import ReturnLink from '../../components/UI/ReturnLink.jsx';
import PageTitle from '../../components/UI/PageTitle.jsx';
import FormOvino from '../../components/layout/forms/rebanho/FormOvino.jsx';
import ErrorParagraph from '../../components/UI/ErrorParagraph.jsx';
import ErrorPage from '../ErrorPage.jsx';
import { PermissionsContext } from '../../store/permissions-context.jsx';

import api from '../../api/request';


const EditarOvino = () => {
  const permissions = useContext(PermissionsContext);
  const data = useLoaderData();
  const fetcher = useFetcher();
  const fetcherData = fetcher.data;

  if (!permissions.perm_alter_rebanho) return <ErrorPage title="Usuário não autorizado" />

  if (fetcherData?.success) return (
    <div className='text-center my-3'>
      <ErrorParagraph error={{ message: fetcherData.message }} />
      <Link to="/rebanho/listar" className='my-link'>Voltar para Listagem de Ovinos</Link>
    </div>
  );
  
  if (data?.isError) return <ErrorPage title={data.message} />

  const handleDelete = () => { 
    if (!data) return;
    fetcher.submit(null, { action: `/rebanho/${data.brinco_num}/excluir`, method: 'DELETE' });
  }

  const pageTitle = 'Editar Ovino N° ' + data.brinco_num;
  const title = (
    <>
      <ReturnLink path="/rebanho/listar" />
      <span className='title-span'>{pageTitle}</span>
    </>
  );

  return (
    <>
      <PageTitle title={title} />
      <div className="form-cont flex-center">
        <FormOvino dados={data} metodo="PUT" excluirOvino={handleDelete} />
      </div>
    </>
  );
};


export default EditarOvino;


export const loader = async ({ params }) => {
  const { brinco } = params;

  try {
    const response = await api.get('/rebanho/' + brinco);
    const data = response.data.sheep;
    return data;
  } catch (err) {
    return {
      isError: true,
      message: err.response?.data?.message || 'Falha ao carregar dados do ovino. Tente novamente mais tarde'
    };
  }
}