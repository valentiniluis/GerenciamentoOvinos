import { useContext } from 'react';
import '../../styles/form.css';
import PageTitle from '../../components/UI/PageTitle';
import FormOvino from '../../components/layout/forms/rebanho/FormOvino';
import ErrorPage from '../ErrorPage.jsx';
import { PermissionsContext } from '../../store/permissions-context.jsx';

import api from '../../api/request.js';


const CadastroRebanho = () => {
  const permissions = useContext(PermissionsContext);

  if (!permissions.perm_alter_rebanho) return <ErrorPage title="Usuário não autorizado" />
  
  return (
    <>
      <PageTitle title="Cadastrar Ovino" />
      <div className="form-cont flex-center">
        <FormOvino metodo="POST" />
      </div>
    </>
  );
};

export default CadastroRebanho;


export const action = async ({ request, params }) => {
  const { method } = request;
  const { brinco } = params;

  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    const submitData = { ...data, usuario_email: 'admin@admin.com' };
    let result;
    if (method === 'POST') result = await api.post('/rebanho', submitData);
    else result = await api.put('/rebanho/' + brinco, submitData);
    return result.data;
  } catch (err) {
    return { 
      isError: true,
      message: err.response.data.message 
    };
  }
}
