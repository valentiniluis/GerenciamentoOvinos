import '../../../../styles/form.css';
import { useState } from 'react';
import FormRow from '../../../UI/FormRow';
import InputField from '../../../UI/InputField';
import FieldWrapper from '../../../UI/FieldWrapper';
import OvinoComprado from '../../../UI/OvinoComprado';
import SelectField from '../../../UI/SelectField';
import ApiAlert from '../../../UI/ApiAlert';
import FormBtn from '../../../UI/FormBtn';

import api from '../../../../api/request';

const FormOvino = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const rowPadding = 'py-3';
  const rows = [
    [
      {
        wrapper: {
          size: 'medium-input',
          class: rowPadding,
        },
        inputProps: {
          label: 'Nº do Brinco',
          id: 'brinco_num',
          type: 'text',
          name: 'brinco_num',
          required: true,
          placeholder: 'Ex. 1N123',
        },
      },
    ],
    [
      {
        wrapper: {
          size: 'medium-input',
          class: rowPadding,
        },
        inputProps: {
          label: 'Raça',
          id: 'raca',
          name: 'raca',
          type: 'text',
          required: true,
          placeholder: 'Ex. Santa Inês',
        },
      },
    ],
    [
      {
        wrapper: {
          size: 'small-input',
          class: rowPadding,
        },
        inputProps: {
          label: 'Sexo',
          id: 'sexo',
          name: 'sexo',
          required: true,
          onInvalid: (e) =>
            e.target.setCustomValidity('Selecione uma finalidade válida'),
          onInput: (e) => e.target.setCustomValidity(''),
          options: [
            {
              value: '',
              disabled: true,
              hidden: true,
              name: 'Selecione o sexo',
            },
            { value: 'M', name: 'Macho' },
            { value: 'F', name: 'Fêmea' },
          ],
        },
      },
      {
        wrapper: {
          size: 'small-input',
          class: rowPadding,
        },
        inputProps: {
          label: 'Data de Nascimento',
          id: 'data_nascimento',
          type: 'date',
          name: 'data_nascimento',
          required: true,
        },
      },
    ],
    [
      {
        wrapper: {
          size: 'small-input',
          class: rowPadding,
        },
        inputProps: {
          label: 'Finalidade',
          id: 'finalidade',
          name: 'finalidade',
          required: true,
          onInvalid: (e) =>
            e.target.setCustomValidity('Selecione uma finalidade válida'),
          onInput: (e) => e.target.setCustomValidity(''),
          options: [
            {
              value: '',
              disabled: true,
              hidden: true,
              name: 'Selecione a finalidade',
            },
            { value: 'Reprodução', name: 'Reprodução' },
            { value: 'Venda', name: 'Venda' },
            { value: 'Leite', name: 'Leite' },
            { value: 'Outra', name: 'Outra' },
          ],
        },
      },
      {
        wrapper: {
          size: 'small-input',
          class: rowPadding,
        },
        inputProps: {
          label: 'Peso Nascimento (kg)',
          id: 'peso_nascimento',
          type: 'number',
          name: 'peso_nascimento',
          min: 0,
          step: 0.001,
          required: true,
          placeholder: 'Ex. 3,250',
        },
      },
    ],
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const jsonData = Object.fromEntries(formData.entries());
      const result = await api.post('/rebanho', jsonData);
      console.log(result);
      setSuccessMsg(result.data.message);
      event.target.reset();
    } catch (err) {
      console.log(err);
      setErrorMsg(
        err.response.data.message ||
          'Erro inesperado. Tente novamente mais tarde',
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="large-input">
      <h4 className="py-1">Informações</h4>
      <OvinoComprado />
      {rows.map((row, i) => (
        <FormRow key={`Form Row ${i + 1}`}>
          {row.map((field) => (
            <FieldWrapper
              key={`${field.inputProps.id} Field`}
              wrapperClass={field.wrapper.class}
              fieldSize={field.wrapper.size}
            >
              {field.inputProps.options !== undefined ? (
                <SelectField {...field.inputProps} />
              ) : (
                <InputField {...field.inputProps} />
              )}
            </FieldWrapper>
          ))}
        </FormRow>
      ))}
      <div className="row py-5 justify-content-center">
        <FormBtn text="Cadastrar" />
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

export default FormOvino;
