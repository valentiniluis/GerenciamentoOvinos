import { useContext } from 'react';
import PageTitle from '../../components/UI/PageTitle';
import FormCadastroUsuario from '../../components/layout/forms/usuarios/FormCadastroUsuario';
import ErrorPage from '../ErrorPage.jsx';
import { PermissionsContext } from '../../store/permissions-context.jsx';

import api from '../../api/request.js';


const CadastroUsuario = () => {
  const permissions = useContext(PermissionsContext);

  if (!permissions.perm_alter_usuario_grupo) return <ErrorPage title="Usuário não autorizado" />
  
  return (
    <>
      <PageTitle title="Cadastrar Usuário" />
      <div className="form-cont px-4 flex-center">
        <FormCadastroUsuario metodo="POST" />
      </div>
    </>
  );
};


export default CadastroUsuario;


export const loader = async () => {
  try {
    return await api.get('/grupos');
  } catch (err) {
    return {
      isError: true,
      defaultMessage: err.message,
      message: 'Não foi possível extrair os grupos. Tente novamente mais tarde.'
    };
  }
}


export const action = async ({ request, params }) => {
  const { method } = request;
  const { email } = params;

  try {
    const formData = await request.formData();
    const jsonData = Object.fromEntries(formData.entries());
    const now = new Date().toISOString().split('T')[0];
    const data = { ...jsonData, data_cadastro: now };
    let result;
    if (method === 'POST') result = await api.post('/usuarios', data);
    else if (method === 'PUT') result = await api.put('/usuarios/' + email, data);
    return result.data;

  } catch (err) {
    return {
      isError: true,
      message: err.response.data.message
    }
  }
}