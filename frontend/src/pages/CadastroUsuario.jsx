import { Button } from 'react-bootstrap';

import '../styles/form.css'

import PageTitle from '../components/UI/PageTitle';
import Sidebar from '../components/layout/sidebar/Sidebar';
import InputField from '../components/UI/InputField';
import FormRow from '../components/UI/FormRow';

const CadastroUsuario = () => {
  const rowPadding = 'py-3';
  const rows = [
    {
      label: 'Nome', size: 'medium-input',
      element: <input id='nome' type='text' name='nome' className="form-input" />
    },
    {
      label: 'E-Mail', size: 'medium-input',
      element: <input id='email' type='email' name='email' className="form-input" />
    },
    {
      label: 'Grupo', size: 'medium-input',
      element: <input id='grupo' type='text' name='grupo' className="form-input" />
    },
    {
      label: 'Senha', size: 'small-input',
      element: <input id='senha' type='password' name='senha' className="form-input" />
    },
    {
      label: 'Confirmação Senha', size: 'small-input',
      element: <input id='confirmacao_senha' type='password' name='confirmacao_senha' className="form-input" />
    }
  ];

  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={'Usuários'} />
      <main className="col cont px-5">
        <PageTitle title="Cadastrar Usuário" />
        <div className='form-cont px-4 flex-center'>
          <form action="/usuario" method="POST">
            {rows.map((row, index) => (
              <FormRow padding={rowPadding} key={`Form Row ${index + 1}`} >
                <InputField label={row.label} input={row.element} size={row.size} />
              </FormRow>
            ))}
            <div className="row pt-5 mt-5 justify-content-center">
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

export default CadastroUsuario;
