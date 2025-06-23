import '../../styles/form.css';
import PageTitle from '../../components/UI/PageTitle';
import FormPerfilUsuario from '../../components/layout/forms/usuarios/FormPerfilUsuario';


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
