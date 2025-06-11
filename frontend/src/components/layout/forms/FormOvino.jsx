import '../../../styles/form.css';
import RenderFields from './RenderFields';
import { Button } from 'react-bootstrap';
import FormRow from '../../UI/FormRow';
import InputField from '../../UI/InputField';
import FieldWrapper from '../../UI/FieldWrapper';
import OvinoComprado from '../../UI/OvinoComprado';
import SelectField from '../../UI/SelectField';

import api from '../../../api/request';

const FormOvino = () => {
  const rowPadding = 'py-2';
  const rows = [
    [
      {
        padding: rowPadding,
        wrapper: {
          class: 'medium-input'
        },
        inputProps: {
          label: 'Nº do Brinco',
          id: "num_brinco",
          type: "text",
          name: "num_brinco",
          required: true,
          placeholder: "Ex. 1N123"
        }
      }
    ],
    [
      {
        padding: rowPadding,
        wrapper: {
          class: 'medium-input'
        },
        inputProps: {
          label: 'Raça',
          id: "raca",
          name: "raca",
          type: "text",
          required: true,
          placeholder: 'Ex. Santa Inês',
        }
      }
    ],
    [
      {
        // label: 'Sexo',
        // <div className="d-flex gap-3">
        padding: rowPadding,
        wrapper: {
          class: 'small-input'
        },
        inputProps: {
          label: "Macho",
          inline: true,
          id: 'macho',
          type: "radio",
          name: "sexo",
          value: "M",
          required: true
        }
      },
      {
        padding: rowPadding,
        wrapper: {
          class: 'small-input'
        },
        inputProps: {
          label: "Fêmea",
          inline: true,
          id: 'femea',
          type: "radio",
          name: "sexo",
          value: "F"
        }
      },
      {
        padding: rowPadding,
        wrapper: {
          class: 'small-input'
        },
        inputProps: {
          label: 'Data de Nascimento',
          id: "data_nasc",
          type: "date",
          name: "data_nasc",
          required: true
        }
      }
    ],
    [
      {
        padding: rowPadding,
        wrapper: {
          class: 'small-input'
        },
        inputProps: {
          label: 'Finalidade',
          id: "finalidade",
          name: "finalidade",
          required: true,
          onInvalid: (e) => e.target.setCustomValidity('Selecione uma finalidade válida'),
          onInput: (e) => e.target.setCustomValidity(''),
          options: [
            { value: "", disabled: true, hidden: true, name: 'Selecione a finalidade' },
            { value: "Reprodução", name: 'Reprodução' },
            { value: "Venda", name: 'Venda' },
            { value: "Leite", name: 'Leite' },
            { value: "Outra", name: 'Outra' }
          ]
        }
      },
      {
        padding: rowPadding,
        wrapper: {
          class: 'small-input'
        },
        inputProps: {
          label: 'Peso Nascimento (kg)',
          id: "peso_nasc",
          type: "number",
          name: "peso_nasc",
          min: 0,
          step: 0.001,
          required: true,
          placeholder: "Ex. 3,250"
        }
      }
    ]
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const jsonData = Object.fromEntries(formData.entries());
      const result = await api.post('/rebanho', jsonData);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <form onSubmit={handleSubmit} className='large-input'>
      <h4 className="py-1">Informações</h4>
      <OvinoComprado />
      {rows.map((row, i) => (
        <FormRow padding={rowPadding} key={`Form Row ${i + 1}`}>
          {row.map(field => (
            <FieldWrapper key={`${field.inputProps.id} Field`} wrapperClass={field.wrapper.class}>
              {field.inputProps.options !== undefined
                ? <SelectField {...field.inputProps} />
                : <InputField {...field.inputProps} />
              }
            </FieldWrapper>
          ))}
        </FormRow>
      ))}
      <div className="row pt-5 mt-2 justify-content-center">
        <Button className="form-btn" variant="primary" type="submit">
          Cadastrar
        </Button>
      </div>
    </form>
  );
}

export default FormOvino;