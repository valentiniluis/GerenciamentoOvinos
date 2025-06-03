import { Form, Button } from 'react-bootstrap';
import Sidebar from "../../components/layout/sidebar/Sidebar";
import PageTitle from "../../components/UI/PageTitle";
import FormRow from '../../components/UI/FormRow';
import InputField from '../../components/UI/InputField';
import { useEffect, useState } from 'react';

const Relatorio = () => {
  const [queryParams, setQueryParams] = useState('');

  const formFields = [
    {
      label: 'Data de Início',
      size: 'small-input',
      element: (
        <Form.Control id='inicio' name='inicio' type='date' />
      )
    },
    {
      label: 'Data Final',
      size: 'small-input',
      element: (
        <Form.Control id='fim' name='fim' type='date' />
      )
    }
  ]

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
          <form onSubmit={handleSubmit}>
            {formFields.map(field => (
              <FormRow padding={'py-3'} key={field.label} >
                <InputField label={field.label} input={field.element} size={field.size} />
              </FormRow>
            ))}
            <div className="row pt-5 justify-content-center">
              <Button className="form-btn" variant="primary" type="submit">
                Gerar Relatório
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Relatorio;
