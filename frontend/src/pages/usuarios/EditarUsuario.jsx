import { useLoaderData } from 'react-router-dom';
import ReturnLink from '../../components/UI/ReturnLink.jsx';
import PageTitle from '../../components/UI/PageTitle';
import FormCadastroUsuario from '../../components/layout/forms/usuarios/FormCadastroUsuario';

import api from '../../api/request.js';


const EditarUsuario = () => {
  const data = useLoaderData();

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