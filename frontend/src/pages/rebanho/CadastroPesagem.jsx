import PageTitle from '../../components/UI/PageTitle';
import FormPesagem from '../../components/layout/forms/pesagem/FormPesagem';


const CadastroPesagem = () => {
  return (
    <>
      <PageTitle title="Cadastrar Pesagem de Ovino" />
      <div className="form-cont flex-center">
        <FormPesagem />
      </div>
    </>
  );
};

export default CadastroPesagem;
