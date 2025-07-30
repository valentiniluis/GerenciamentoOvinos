import { useContext } from 'react';
import '../../styles/form.css';
import PageTitle from '../../components/UI/PageTitle.jsx';
import FormGrupo from '../../components/layout/forms/grupos/FormGrupo.jsx';
import ErrorPage from '../ErrorPage.jsx';
import { PermissionsContext } from '../../store/permissions-context.jsx';

import api from '../../api/request.js';


const CadastroGrupo = () => {
  const permissions = useContext(PermissionsContext);

  if (!permissions.perm_alter_usuario_grupo) return <ErrorPage title="Usuário não autorizado" />

  return (
    <>
      <PageTitle title="Cadastrar Grupo" />
      <div className="form-cont px-4 flex-center">
        <FormGrupo metodo="POST" />
      </div>
    </>
  );
};

export default CadastroGrupo;


export const action = async ({ request, params }) => {
  const { method } = request;
  const { nome } = params;

  try {
    const formData = await request.formData();
    const allEntries = formData.entries();
    const tempData = {};
    const permissoes = {};
    allEntries.forEach(([key, value]) => {
      if (key.startsWith('visualizar') || key.startsWith('alterar')) {
        permissoes[key] = value;
      }
      else tempData[key] = value;
    });
    const submitData = { ...tempData, permissoes };
    let result;
    if (method === 'POST') result = await api.post('/grupos', submitData);
    else if (method === 'PUT') result = await api.put('/grupos/' + nome, submitData);
    return result.data;
  } catch (err) {
    return {
      isError: true,
      message: err.response.data.message
    };
  }
}