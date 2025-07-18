import { useContext } from 'react';
import PageTitle from '../../components/UI/PageTitle';
import FormPesagem from '../../components/layout/forms/pesagem/FormPesagem';
import ErrorPage from '../ErrorPage.jsx';
import { PermissionsContext } from '../../store/permissions-context.jsx';

import api from '../../api/request.js';


const CadastroPesagem = () => {
  const permissions = useContext(PermissionsContext);

  if (!permissions.perm_alter_rebanho) return <ErrorPage title="Usuário não autorizado" />
  
  return (
    <>
      <PageTitle title="Cadastrar Pesagem de Ovino" />
      <div className="form-cont flex-center">
        <FormPesagem />
      </div>
    </>
  );
};

export default CadastroPesagem;


export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const jsonData = Object.fromEntries(formData.entries());
    const postData = { ...jsonData, observacao: jsonData.observacao || null };
    const result = await api.post('/rebanho/pesagem', postData);
    return result.data;
  } catch (err) {
    return {
      isError: true,
      message: err.response.data.message || 'Falha ao cadastrar pesagem'
    }
  }
};
