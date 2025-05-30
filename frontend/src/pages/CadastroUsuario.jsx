import { Button } from 'react-bootstrap';

import '../styles/sidebar.css';
import '../styles/form.css'

import PageTitle from '../components/UI/PageTitle';
import Sidebar from '../components/layout/sidebar/Sidebar';
import InputField from '../components/UI/InputField';
import FormRow from '../components/UI/FormRow';

const CadastroUsuario = () => {
  const campos = [
    { label: 'Nome', element: <input id='nome' type='text' name='nome' className="form-input" />, size: 'medium-input' },
    { label: 'E-Mail', element: <input id='email' type='email' name='email' className="form-input" />, size: 'medium-input' },
    { label: 'Grupo', element: <input id='grupo' type='text' name='grupo' className="form-input" />, size: 'medium-input' },
    { label: 'Senha', element: <input id='senha' type='password' name='senha' className="form-input" />, size: 'small-input' },
    { label: 'Confirmação Senha', element: <input id='confirmacao_senha' type='password' name='confirmacao_senha' className="form-input" />, size: 'small-input' }
  ];

  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={'Usuários'} />
      <main className="col cont px-5">
        <PageTitle title="Cadastrar Usuário" />
        <div className='form-cont px-4 flex-center'>
          <form action="/usuario" method="POST">
            {campos.map((campo) => {
              return (
                <FormRow>
                  <InputField label={campo.label} input={campo.element} size={campo.size} />
                </FormRow>
              );
            })}
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
