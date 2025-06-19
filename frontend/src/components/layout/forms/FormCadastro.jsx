import { Button } from 'react-bootstrap';
import RenderFields from './RenderFields';

import api from '../../../api/request';

const FormCadastro = () => {
  const rowPadding = 'py-3';
  const inputs = [
    {
      padding: rowPadding,
      wrapper: {
        class: 'medium-input m-auto'
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
      padding: rowPadding,
      wrapper: {
        class: 'medium-input m-auto'
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
      padding: rowPadding,
      wrapper: {
        class: 'medium-input m-auto'
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
      padding: rowPadding,
      wrapper: {
        class: 'medium-input m-auto'
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
    <form className="col-xl-6 col-lg-7 col-md-8 col-sm-10 col-12 bg-white my-form" onSubmit={handleLogin}>
      <div className="row py-4">
        <h2 className="text-center">Criar Conta</h2>
      </div>
      <section className="medium-input m-auto">
        <RenderFields fields={inputs} />
      </section>
      <div className="row py-5 justify-content-center">
        <Button className="form-btn" variant="primary" type="submit">
          Cadastrar
        </Button>
      </div>
    </form>
  );
}


export default FormCadastro;