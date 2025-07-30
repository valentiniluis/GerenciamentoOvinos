import { useContext } from 'react';
import { useFetcher, useLoaderData, Link } from 'react-router-dom';
import ReturnLink from '../../components/UI/ReturnLink.jsx';
import PageTitle from '../../components/UI/PageTitle';
import FormUsuario from '../../components/layout/forms/usuarios/FormUsuario.jsx';
import ErrorPage from '../ErrorPage.jsx';
import ErrorParagraph from '../../components/UI/ErrorParagraph.jsx';
import { PermissionsContext } from '../../store/permissions-context.jsx';

import api from '../../api/request.js';


const EditarUsuario = () => {
  const permissions = useContext(PermissionsContext);
  const data = useLoaderData();
  const fetcher = useFetcher();
  const fetcherData = fetcher.data;

  const isAdmin = (data.grupo_nome === 'Administrador');
  if (!permissions.perm_alter_usuario_grupo || isAdmin) return <ErrorPage title="Usuário não autorizado" />;
  
  if (fetcherData?.success) return (
    <div className='text-center my-3'>
      <ErrorParagraph error={{ message: fetcherData.message }} />
      <Link to="/usuario/listar" className='my-link'>Voltar para Listagem de Usuários</Link>
    </div>
  );
  
  if (data.isError) return <ErrorPage title="Usuário não encontrado" />;

  const handleDelete = () => {
    if (!data) return;
    fetcher.submit(null, { action: `/usuario/${data.email}/excluir`, method: 'DELETE' });
  }

  const title = (
    <>
      <ReturnLink path="/usuario/listar" />
      <span className='title-span'>Editar Usuário</span>
    </>
  );

  return (
    <>
      <PageTitle title={title} />
      <div className="form-cont px-4 flex-center">
        <FormUsuario metodo="PUT" dados={data} excluirUsuario={handleDelete} />
      </div>
    </>
  );
};


export default EditarUsuario;


export const loader = async ({ params }) => {
  const { email } = params;

  try {
    const response = await api.get('/usuarios/' + email);
    return response.data;
  } catch (err) {
    return {
      isError: true,
      message: err.response.data.message
    }
  }
}