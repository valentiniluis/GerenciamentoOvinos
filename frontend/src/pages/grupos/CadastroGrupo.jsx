import '../../styles/form.css';
import PageTitle from '../../components/UI/PageTitle.jsx';
import FormCadastroGrupo from '../../components/layout/forms/grupos/FormCadastroGrupo.jsx';

import api from '../../api/request.js';


const CadastroGrupo = () => {
  return (
    <>
      <PageTitle title="Cadastrar Grupo" />
      <div className="form-cont px-4 flex-center">
        <FormCadastroGrupo metodo="POST" />
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