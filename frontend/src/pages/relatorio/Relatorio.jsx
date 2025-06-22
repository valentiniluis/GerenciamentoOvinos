import { useEffect, useState } from 'react';
import Sidebar from "../../components/layout/sidebar/Sidebar";
import PageTitle from "../../components/UI/PageTitle";
import FormRelatorio from '../../components/layout/forms/relatorio/FormRelatorio';


const Relatorio = () => {
  const [queryParams, setQueryParams] = useState('');

  useEffect(() => {
    console.log(queryParams);
    // fazer request...
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const inicio = formData.get('inicio');
    const fim = formData.get('fim');
    setQueryParams(`inicio=${inicio}&fim=${fim}`);
  }

  return (
    <div className="row m-0">
      <Sidebar user="Luís" currentPage="Relatório" />
      <main className="col cont px-5">
        <PageTitle title="Geração de Relatórios" />
        <div className="form-cont limit-600 m-auto">
          <p className='my-paragraph py-3'>
            Gere relatórios informativos sobre o rebanho de acordo com o período de tempo desejado.
            Selecione a data de início, a data final do relatório e então poderá gerar
            um PDF com informações sobre nascimentos, doenças diagnosticadas e mais.
          </p>
          <FormRelatorio onSubmit={handleSubmit} />
        </div>
      </main>
    </div>
  );
}

export default Relatorio;
