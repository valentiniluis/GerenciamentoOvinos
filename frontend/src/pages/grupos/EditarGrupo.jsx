import { useContext } from 'react';
import { useFetcher, useLoaderData, Link } from 'react-router-dom';
import PageTitle from '../../components/UI/PageTitle.jsx';
import ReturnLink from '../../components/UI/ReturnLink.jsx';
import FormGrupo from '../../components/layout/forms/grupos/FormGrupo.jsx';
import ErrorParagraph from '../../components/UI/ErrorParagraph.jsx';
import ErrorPage from '../ErrorPage.jsx';
import { PermissionsContext } from '../../store/permissions-context.jsx';

import api from '../../api/request.js';


const EditarGrupo = () => {
  const permissions = useContext(PermissionsContext);
  const data = useLoaderData();
  const fetcher = useFetcher();
  const fetcherData = fetcher.data;

  if (!permissions.perm_alter_usuario_grupo) return <ErrorPage title="Usuário não autorizado" />;

  if (fetcherData?.success) return (
    <div className='text-center my-3'>
      <ErrorParagraph error={{ message: fetcherData.message }} />
      <Link to="/grupo/listar" className='my-link'>Voltar para Listagem de Grupos</Link>
    </div>
  );

  if (data?.isError) return <ErrorPage title={data.message} />;

  const handleDelete = () => {
    if (!data) return;
    fetcher.submit(null, { action: `/grupo/${data.nome}/excluir`, method: 'DELETE' });
  }

  const title = (
    <>
      <ReturnLink path="/grupo/listar" />
      <span className='title-span'>Editar Grupo</span>
    </>
  );

  return (
    <>
      <PageTitle title={title} />
      <div className="form-cont px-4 flex-center">
        <FormGrupo metodo="PUT" dados={data} excluirGrupo={handleDelete} />
      </div>
    </>
  );
};


export default EditarGrupo;


export const loader = async ({ params }) => {
  const { nome } = params;

  try {
    const response = await api.get('/grupos/' + nome);
    return response.data;
  } catch (err) {
    return {
      isError: true,
      message: err.response.data.message || 'Falha ao buscar grupo'
    }
  }
}