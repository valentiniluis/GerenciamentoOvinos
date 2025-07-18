import { Form, useActionData } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import '../../../../styles/form.css';
import ApiAlert from '../../../UI/ApiAlert.jsx';
import RenderFields from '../RenderFields.jsx';
import FormBtn from '../../../UI/FormBtn.jsx';


const FormPesagem = () => {
  const data = useActionData();
  const formRef = useRef();

  useEffect(() => {
    if (!data?.isError) formRef.current.reset();
  }, [data]);

  const rowPadding = 'py-3';
  const fields = [
    {
      wrapper: {
        size: 'medium-input',
        class: rowPadding,
      },
      inputProps: {
        label: 'Nº do Brinco',
        type: 'text',
        id: 'brinco_num',
        name: 'brinco_num',
        required: true,
        placeholder: 'Ex. 1N123',
      },
    },
    {
      wrapper: {
        size: 'medium-input',
        class: rowPadding,
      },
      inputProps: {
        label: 'Etapa da Vida',
        id: 'etapa_vida',
        name: 'etapa_vida',
        required: true,
        onInvalid: (e) =>
          e.target.setCustomValidity('Escolha uma etapa válida'),
        onInput: (e) => e.target.setCustomValidity(''),
        options: [
          { value: '', hidden: true, name: 'Selecione a etapa' },
          { value: 'Desmame', name: 'Desmame' },
          { value: 'Engorda', name: 'Engorda' },
          { value: 'Abate', name: 'Abate' },
          { value: 'Reprodução', name: 'Reprodução' },
        ],
      },
    },
    {
      wrapper: {
        size: 'small-input',
        class: rowPadding,
      },
      inputProps: {
        label: 'Peso (kg)',
        type: 'number',
        id: 'peso',
        name: 'peso',
        step: 0.001,
        min: 0,
        required: true,
        placeholder: 'Ex. 3,500',
      },
    },
    {
      wrapper: {
        size: 'small-input',
        class: rowPadding,
      },
      inputProps: {
        label: 'Data Pesagem',
        type: 'date',
        id: 'data_pesagem',
        name: 'data_pesagem',
        required: true,
      },
    },
    {
      wrapper: {
        size: 'large-input',
        class: rowPadding,
      },
      inputProps: {
        label: 'Observação',
        type: 'text',
        id: 'observacao',
        name: 'observacao',
        placeholder: 'Observações adicionais',
      },
    },
  ];

  return (
    <Form method="POST" className="large-input" ref={formRef}>
      <RenderFields fields={fields} />
      <div className="row py-5 justify-content-center">
        <FormBtn text="Cadastrar" type="submit"/>
      </div>
      <ApiAlert />
    </Form>
  );
};

export default FormPesagem;
