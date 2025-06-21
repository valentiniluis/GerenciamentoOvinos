import '../../styles/form.css';
import PageTitle from '../../components/UI/PageTitle';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import FormPerfilUsuario from '../../components/layout/forms/usuarios/FormPerfilUsuario';


const PerfilUsuario = () => {
  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={''} />
      <main className="col cont px-5">
        <PageTitle title="Meu Perfil" />
        <div className="form-cont px-4 flex-center">
          <FormPerfilUsuario />
        </div>
      </main>
    </div>
  );
};

export default PerfilUsuario;
