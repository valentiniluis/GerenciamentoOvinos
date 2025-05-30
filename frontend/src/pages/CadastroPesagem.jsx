import Sidebar from "../components/layout/sidebar/Sidebar";
import PageTitle from "../components/UI/PageTitle";

const CadastroPesagem = () => {
  return (
    <div className="row m-0">
      <Sidebar user="Luís" currentPage='Rebanho' />
      <main className="col cont px-5">
        <PageTitle title="Cadastrar Pesagem de Ovino" />
        <div className="row">
          <form action="/" method="POST">
            
          </form>
        </div>
      </main>
    </div>
  );
}


export default CadastroPesagem;