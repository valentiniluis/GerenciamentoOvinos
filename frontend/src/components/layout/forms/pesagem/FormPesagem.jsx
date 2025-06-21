import '../../../../styles/form.css';
import { useState } from 'react';
import ApiAlert from '../../../UI/ApiAlert';
import RenderFields from '../RenderFields';
import FormBtn from '../../../UI/FormBtn';

import api from '../../../../api/request';

const FormPesagem = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const jsonData = Object.fromEntries(formData.entries());
      const postData = { ...jsonData, observacao: jsonData.observacao || null };
      const result = await api.post('/rebanho/pesagem', postData);
      console.log(result);
      setSuccessMsg(result.data.message);
      event.target.reset();
    } catch (err) {
      console.log(err);
      setErrorMsg(
        err.response?.data?.message ||
          'Erro inesperado. Tente novamente mais tarde',
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="large-input">
      <RenderFields fields={fields} />
      <div className="row py-5 justify-content-center">
        <FormBtn text="Cadastrar" type="submit"/>
      </div>
      <ApiAlert
        variant="danger"
        message={errorMsg}
        onClose={() => setErrorMsg(null)}
      />
      <ApiAlert
        variant="success"
        message={successMsg}
        onClose={() => setSuccessMsg(null)}
      />
    </form>
  );
};

export default FormPesagem;
