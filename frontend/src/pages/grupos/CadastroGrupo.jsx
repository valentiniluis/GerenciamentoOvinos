import '../../styles/form.css';
import PageTitle from '../../components/UI/PageTitle';
import FormCadastroGrupo from '../../components/layout/forms/grupos/FormCadastroGrupo';


const CadastroGrupo = () => {
  return (
    <>
      <PageTitle title="Cadastrar Grupo" />
      <div className="form-cont px-4 flex-center">
        <FormCadastroGrupo />
      </div>
    </>
  );
};

export default CadastroGrupo;
