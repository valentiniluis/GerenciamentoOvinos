import '../../../styles/form.css';
import RenderFields from './RenderFields';
import { Button } from 'react-bootstrap';

import api from '../../../api/request';

const FormPesagem = () => {
  const rowPadding = 'py-3';
  const fields = [
    {
      padding: rowPadding,
      wrapper: {
        class: 'medium-input',
      },
      inputProps: {
        label: 'Nº do Brinco',
        type: "text",
        id: "num_brinco",
        name: "num_brinco",
        required: true,
        placeholder: "Ex. 1N123"
      }
    },
    {
      padding: rowPadding,
      wrapper: {
        class: 'medium-input',
      },
      inputProps: {
        label: 'Etapa da Vida',
        id: "etapa",
        name: "etapa",
        required: true,
        onInvalid: (e) => e.target.setCustomValidity('Escolha uma etapa válida'),
        onInput: (e) => e.target.setCustomValidity(''),
        options: [
          { value: "", hidden: true, name: "Selecione a etapa" },
          { value: "Desmame", name: "Desmame" },
          { value: "Engorda", name: "Engorda" },
          { value: "Abate", name: "Abate" },
          { value: "Reprodução", name: "Reprodução" }
        ]
      }
    },
    {
      padding: rowPadding,
      wrapper: {
        class: 'small-input',
      },
      inputProps: {
        label: 'Peso (kg)',
        type: "number",
        id: "peso",
        name: "peso",
        step: 0.001,
        min: 0,
        required: true,
        placeholder: "Ex. 3,500"
      }
    },
    {
      padding: rowPadding,
      wrapper: {
        class: 'small-input',
      },
      inputProps: {
        label: 'Data Pesagem',
        type: "date",
        id: "data_pesagem",
        name: "data_pesagem",
        required: true
      }
    },
    {
      padding: rowPadding,
      wrapper: {
        class: 'large-input',
      },
      inputProps: {
        label: 'Observação',
        type: "text",
        id: "observacao",
        name: "observacao",
        placeholder: "Observações adicionais"
      }
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const jsonData = Object.fromEntries(formData.entries());
      const postData = { ...jsonData, observacao: jsonData.observacao || null };
      const result = await api.post('/rebanho/pesagem', postData);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <RenderFields fields={fields} />
      <div className="row py-5 justify-content-center">
        <Button className="form-btn" variant="primary" type="submit">
          Cadastrar
        </Button>
      </div>
    </form>
  );
}

export default FormPesagem;