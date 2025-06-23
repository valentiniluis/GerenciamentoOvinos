import PageTitle from '../../components/UI/PageTitle';
import FormCadastroUsuario from '../../components/layout/forms/usuarios/FormCadastroUsuario';

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
