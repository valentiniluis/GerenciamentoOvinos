import { useEffect, useState } from 'react';
import PageTitle from "../../components/UI/PageTitle";
import FormRelatorio from '../../components/layout/forms/relatorio/FormRelatorio';


const Relatorio = () => {
  const [queryParams, setQueryParams] = useState('');

  // useEffect(() => {
    // fazer request...
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const inicio = formData.get('inicio');
    const fim = formData.get('fim');
    setQueryParams(`inicio=${inicio}&fim=${fim}`);
  }

  return (
    <>
      <PageTitle title="Geração de Relatórios" />
      <div className="form-cont limit-600 m-auto">
        <p className='report-paragraph py-3'>
          Selecione a data de início e a data final do relatório e gere relatórios
          informativos sobre o rebanho de acordo com o período de tempo desejado.
        </p>
        <FormRelatorio onSubmit={handleSubmit} />
      </div>
    </>
  );
}

export default Relatorio;
