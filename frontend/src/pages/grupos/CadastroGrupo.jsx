import '../../styles/form.css';
import PageTitle from '../../components/UI/PageTitle';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import FormCadastroGrupo from '../../components/layout/forms/grupos/FormCadastroGrupo';


const CadastroGrupo = () => {
  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={'Grupos'} />
      <main className="col cont px-5">
        <PageTitle title="Cadastrar Grupo" />
        <div className="form-cont px-4 flex-center">
          <FormCadastroGrupo />
        </div>
      </main>
    </div>
  );
};

export default CadastroGrupo;
