import { Button } from 'react-bootstrap';
import RenderFields from './RenderFields';
import FormBtn from '../../UI/FormBtn';

import api from '../../../api/request';

const FormCadastro = () => {
  const rowPadding = 'py-3';
  const inputs = [
    {
      wrapper: {
        size: 'large-input',
        class: rowPadding + ' m-auto'
      },
      inputProps: {
        label: 'Nome',
        id: 'nome',
        name: 'nome',
        type: 'text',
        className: 'form-input m-auto'
      }
    },
    {
      wrapper: {
        size: 'large-input',
        class: rowPadding + ' m-auto'
      },
      inputProps: {
        label: 'E-Mail',
        id: 'email',
        name: 'email',
        type: 'email',
        className: 'form-input'
      }
    },
    {
      wrapper: {
        size: 'large-input',
        class: rowPadding + ' m-auto'
      },
      inputProps: {
        label: 'Senha',
        id: 'senha',
        name: 'senha',
        type: 'password',
        className: 'form-input',
      }
    },
    {
      wrapper: {
        size: 'large-input',
        class: rowPadding + ' m-auto'
      },
      inputProps: {
        label: 'Confirmação da senha',
        id: 'confirmacao_senha',
        name: 'confirmacao_senha',
        type: 'password',
        className: 'form-input',
      }
    }
  ];


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const jsonData = Object.fromEntries(formData.entries());
      const result = await api.post('/login', jsonData);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <form className="col-xl-7 col-lg-8 col-md-9 col-sm-11 col-12 my-form" onSubmit={handleLogin}>
      <div className="row py-4">
        <h2 className="text-center">Criar Conta</h2>
      </div>
      <section className="medium-input login-input-wrapper">
        <RenderFields fields={inputs} />
      </section>
      <div className="row py-5 justify-content-center">
        <FormBtn text="Cadastrar" className="auth-btn" />
      </div>
    </form>
  );
}


export default FormCadastro;