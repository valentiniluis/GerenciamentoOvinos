import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import ReturnLink from '../../components/UI/ReturnLink.jsx';
import PageTitle from '../../components/UI/PageTitle';
import FormCadastroUsuario from '../../components/layout/forms/usuarios/FormCadastroUsuario';
import ErrorPage from '../ErrorPage.jsx';
import { PermissionsContext } from '../../store/permissions-context.jsx';

import api from '../../api/request.js';


const EditarUsuario = () => {
  const permissions = useContext(PermissionsContext);
  const data = useLoaderData();

  const isAdmin = (data.grupo_nome === 'Administrador');
  if (!permissions.perm_alter_usuario_grupo || isAdmin) return <ErrorPage title="Usuário não autorizado" />;
  if (data.isError) return <ErrorPage title="Usuário não encontrado" />;

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
        <FormCadastroUsuario metodo="PUT" dados={data} />
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