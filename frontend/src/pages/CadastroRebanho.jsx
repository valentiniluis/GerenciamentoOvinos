import { Button } from 'react-bootstrap';
import { useState } from 'react';

import '../styles/sidebar.css';
import '../styles/form.css'

import PageTitle from '../components/UI/PageTitle';
import Sidebar from '../components/layout/sidebar/Sidebar';
import InputField from '../components/UI/InputField';
import FormRow from '../components/UI/FormRow';

const CadastroRebanho = () => {
  const [comprado, setComprado] = useState(false);

  const changeComprado = event => {
    // se o checkbox estiver marcardo, o state 'comprado' será = true.
    // com isso, faz-se um reset no valor do input 'Brinco Mãe'
    setComprado(event.target.checked);
    if (comprado === false) document.getElementById('brinco_mae').value = '';
  }

  const padding = 'py-3';
  const rows = [
    [
      { element: <input id='num_brinco' type='text' name='num_brinco' className="form-input" />,
        label: 'Nº do Brinco', size: 'medium-input', padding }
    ],
    [
      { element: <input id='brinco_mae' type='text' name='brinco_mae' className="form-input" disabled={comprado === true} />,
        label: 'Nº Brinco Mãe', size: 'medium-input', padding },
      { element: <input id='comprado' type='checkbox' name='comprado' className="form-input" onChange={changeComprado} value={true} />,
        label: 'Ovino Comprado', size: 'small-input', labelClass: 'w-100 text-center', padding }
    ],
    [
      { element: <input id='raca' type='text' name='raca' className="form-input" />,
        label: 'Raça', size: 'medium-input', padding }
    ],
    [
      { element: <input id='sexo' type='text' name='sexo' className="form-input" />, 
        label: 'Sexo', size: 'small-input', padding },
      { element: <input id='data_nasc' type='date' name='data_nasc' className="form-input" />, 
        label: 'Data de Nascimento', size: 'small-input', padding }
    ],
    [
      { element: <input id='finalidade' type='text' name='finalidade' className="form-input" />, 
        label: 'Finalidade', size: 'small-input', padding },
      { element: <input id='peso_nasc' type='number' name='peso_nasc' className="form-input" min={0} step={0.001} />, 
        label: 'Peso Nascimento', size: 'small-input', padding }
    ],
    [
      { element: <input id='observacao' type='text' name='observacao' className="form-input" />, 
        label: 'Observação', size: 'large-input', padding }
    ]
  ];

  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={'Rebanho'} />
      <main className="col cont px-5">
        <PageTitle title="Cadastrar Ovino" />
        <div className='form-cont flex-center'>
          <form action="/ovino" method="POST">
            <h4 className='py-3'>Informações</h4>
            {rows.map(row => (
              <FormRow padding={row.padding}>
                {row.map(field => (
                  <InputField input={field.element} label={field.label} size={field.size} labelClass={field.labelClass} />
                ))}
              </FormRow>
            ))}
            <div className="row py-5 justify-content-center">
              <Button className="form-btn" variant="primary" type="submit">
                Cadastrar
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CadastroRebanho;
