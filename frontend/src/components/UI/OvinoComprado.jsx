import { useState } from 'react';
import FormRow from './FormRow';
import InputField from './InputField';
import FieldWrapper from './FieldWrapper';


const OvinoComprado = () => {
  const [comprado, setComprado] = useState(false);

  const changeComprado = (event) => {
    // se o checkbox estiver marcardo, o state 'comprado' será = true.
    // com isso, faz-se um reset no valor do input 'Brinco Mãe'
    setComprado(event.target.checked);
    if (comprado === false) document.getElementById('brinco_mae').value = '';
  };

  const input = [
    {
      wrapper: {
        size: 'medium-input',
        class: 'py-2'
      },
      inputProps: {
        label: 'Nº Brinco Mãe',
        id: "brinco_mae",
        type: "text",
        name: "brinco_mae",
        placeholder: (!comprado ? "Ex. 1N123" : ""),
        disabled: (comprado === true),
        required: (!comprado),
      }
    },
    {
      wrapper: {
        size: 'medium-input',
        class: 'd-flex flex-column-reverse align-items-center justify-content-end'
      },
      inputProps: {
        label: 'Ovino Comprado',
        id: "comprado",
        type: "checkbox",
        name: "comprado",
        onChange: changeComprado,
        value: true,
      }
    }
  ]

  return (
    <FormRow>
      {input.map(field => (
        <FieldWrapper 
          key={field.inputProps.id} 
          wrapperClass={field.wrapper.class}
          fieldSize={field.wrapper.size}
        >
          <InputField {...field.inputProps} />
        </FieldWrapper>
      ))}
    </FormRow>
  );
}


export default OvinoComprado;