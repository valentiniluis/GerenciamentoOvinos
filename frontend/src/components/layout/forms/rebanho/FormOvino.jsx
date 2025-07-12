import '../../../../styles/form.css';
import { Form, useSubmit } from 'react-router-dom';
import FormRow from '../../../UI/FormRow.jsx';
import InputField from '../../../UI/InputField.jsx';
import FieldWrapper from '../../../UI/FieldWrapper.jsx';
import OvinoComprado from '../../../UI/OvinoComprado.jsx';
import SelectField from '../../../UI/SelectField.jsx';
import ApiAlert from '../../../UI/ApiAlert.jsx';
import FormBtn from '../../../UI/FormBtn.jsx';
import DeleteConfirmation from '../../modal/DeleteConfirmation.jsx'
import { dateFromLocaleToISO } from '../../../../util/utilFunctions.js';


const FormOvino = ({ dados, metodo }) => {
  const submit = useSubmit();

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
          defaultValue: dados?.brinco_num
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
          defaultValue: dados?.raca
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
          defaultValue: dados?.sexo,
          options: [
            { value: '', disabled: true, hidden: true, name: 'Selecione o sexo' },
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
          defaultValue: (metodo === 'PUT')
            ? dateFromLocaleToISO(dados.data_nascimento)
            : undefined
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
          defaultValue: dados?.finalidade,
          options: [
            { value: 'Reprodução', name: 'Reprodução' },
            { value: 'Abate', name: 'Abate' },
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
          defaultValue: dados?.peso_nascimento
        },
      },
    ],
  ];

  if (metodo === 'PUT') {
    const abatido = (dados.abatido === "Sim") ? true : false;
    const abatidoProps = {
      wrapper: {
        padding: rowPadding,
        size: 'large-input'
      },
      inputProps: {
        label: 'Abatido',
        id: 'abatido',
        name: 'abatido',
        required: true,
        defaultValue: abatido,
        options: [
          { value: '', hidden: true, name: "Ovino foi abatido?" },
          { value: true, name: 'Sim' },
          { value: false, name: 'Não' },
        ]
      }
    }
    rows.push([abatidoProps]);
  }

  let formButtons = <FormBtn text="Cadastrar" type="submit" />;

  if (metodo === 'PUT') {
    const handleDelete = () => submit(null, { action: `/rebanho/${dados.brinco_num}/excluir`, method: 'DELETE' });
    formButtons = (
      <>
        <FormBtn text="Salvar" type="submit" />
        <DeleteConfirmation
          buttonText="Excluir Ovino"
          title="Confirmar Exclusão"
          text="Excluir um ovino irá também deletar suas pesagens e registros médicos"
          confirm={handleDelete}
        />
      </>
    )
  };

  return (
    <Form method={metodo} className="large-input">
      <h4 className="py-1">Informações</h4>
      <OvinoComprado dados={{ brinco_mae: dados?.brinco_mae }} metodo={metodo} />
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
      <div className="row py-5 gap-5 justify-content-center">
        {formButtons}
      </div>
      <ApiAlert />
    </Form>
  );
};

export default FormOvino;
