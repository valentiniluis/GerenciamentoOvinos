import PageTitle from '../../components/UI/PageTitle';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import FormCadastroUsuario from '../../components/layout/forms/usuarios/FormCadastroUsuario';

const CadastroUsuario = () => {
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const formData = new FormData(event.target);
  //     const jsonData = Object.fromEntries(formData.entries());
  //     const postData = { ...jsonData, data_cadastro: new Date() };
  //     const result = await api.post('/usuarios', postData);
  //     console.log(result);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={'Usuários'} />
      <main className="col cont px-5">
        <PageTitle title="Cadastrar Usuário" />
        <div className="form-cont px-4 flex-center">
          <FormCadastroUsuario />
        </div>
      </main>
    </div>
  );
};

export default CadastroUsuario;
