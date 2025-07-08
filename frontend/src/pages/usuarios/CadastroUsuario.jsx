import PageTitle from '../../components/UI/PageTitle';
import FormCadastroUsuario from '../../components/layout/forms/usuarios/FormCadastroUsuario';

import api from '../../api/request.js';


const CadastroUsuario = () => {
  return (
    <>
      <PageTitle title="Cadastrar Usuário" />
      <div className="form-cont px-4 flex-center">
        <FormCadastroUsuario />
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