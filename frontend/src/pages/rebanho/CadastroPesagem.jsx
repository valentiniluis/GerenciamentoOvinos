import Sidebar from '../../components/layout/sidebar/Sidebar';
import PageTitle from '../../components/UI/PageTitle';
import FormPesagem from '../../components/layout/forms/FormPesagem';


const CadastroPesagem = () => {
  return (
    <div className="row m-0">
      <Sidebar user="Luís" currentPage="Rebanho" />
      <main className="col cont px-5">
        <PageTitle title="Cadastrar Pesagem de Ovino" />
        <div className="form-cont flex-center">
          <FormPesagem />
        </div>
      </main>
    </div>
  );
};

export default CadastroPesagem;
