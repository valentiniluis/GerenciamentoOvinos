import '../../styles/form.css';
import PageTitle from '../../components/UI/PageTitle';
import FormPerfilUsuario from '../../components/layout/forms/usuarios/FormPerfilUsuario';

import api from '../../api/request.js';


const PerfilUsuario = () => {
  return (
    <>
      <PageTitle title="Meu Perfil" />
      <div className="form-cont px-4 flex-center">
        <FormPerfilUsuario />
      </div>
    </>
  );
};

export default PerfilUsuario;


export const loader = async () => {
  try {
    const response = await api.get('/usuarios/perfil');
    return response.data;
  } catch (err) {
    return {
      isError: true,
      message: err.response?.data?.message || 'Falha carregar o perfil'
    }
  }
}