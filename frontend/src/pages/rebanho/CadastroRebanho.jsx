import '../../styles/form.css';
import PageTitle from '../../components/UI/PageTitle';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import FormOvino from '../../components/layout/forms/FormOvino';

const CadastroRebanho = () => {
  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={'Rebanho'} />
      <main className="col cont px-5">
        <PageTitle title="Cadastrar Ovino" />
        <div className="form-cont flex-center">
          <FormOvino />
        </div>
      </main>
    </div>
  );
};

export default CadastroRebanho;
