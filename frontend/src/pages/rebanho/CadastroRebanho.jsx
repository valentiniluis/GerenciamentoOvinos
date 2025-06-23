import '../../styles/form.css';
import PageTitle from '../../components/UI/PageTitle';
import FormOvino from '../../components/layout/forms/rebanho/FormOvino';

const CadastroRebanho = () => {
  return (
    <>
      <PageTitle title="Cadastrar Ovino" />
      <div className="form-cont flex-center">
        <FormOvino />
      </div>
    </>
  );
};

export default CadastroRebanho;
