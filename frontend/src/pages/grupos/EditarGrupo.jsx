import { useLoaderData } from 'react-router-dom';
import PageTitle from '../../components/UI/PageTitle.jsx';
import ReturnLink from '../../components/UI/ReturnLink.jsx';
import FormCadastroGrupo from '../../components/layout/forms/grupos/FormCadastroGrupo.jsx';
import ErrorParagraph from '../../components/UI/ErrorParagraph.jsx';

import api from '../../api/request.js';


const EditarGrupo = () => {
  const data = useLoaderData();

  if (data.isError) {
    return <ErrorParagraph error={data} />
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
        <FormCadastroGrupo metodo="PUT" dados={data} />
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