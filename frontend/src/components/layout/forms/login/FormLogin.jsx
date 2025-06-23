import { Link } from 'react-router-dom';
import FormRow from '../../../UI/FormRow';
import RenderFields from '../RenderFields';
import FormBtn from '../../../UI/FormBtn';

import api from '../../../../api/request';

const FormLogin = () => {
  const rowPadding = 'py-3';
  const inputs = [
    {
      wrapper: {
        class: rowPadding + ' m-auto',
        size: 'large-input'
      },
      inputProps: {
        label: 'E-Mail',
        id: 'email',
        name: 'email',
        type: 'email',
        className: 'form-input',
      },
    },
    {
      wrapper: {
        class: rowPadding + ' m-auto',
        size: 'large-input'
      },
      inputProps: {
        label: 'Senha',
        id: 'senha',
        name: 'senha',
        type: 'password',
        className: 'form-input',
      },
    },
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
  };

  return (
    <form className="col-xl-7 col-lg-8 col-md-9 col-sm-11 col-12 my-form" onSubmit={handleLogin}>
      <div className="row py-4">
        <h2 className="text-center">Acessar Sistema</h2>
      </div>
      <section className="medium-input login-input-wrapper">
        <RenderFields fields={inputs} />
      </section>
      <FormRow>
        <Link id="forgot-pw-link" className="text-center my-link pt-4" to="...">
          Esqueci Minha Senha
        </Link>
      </FormRow>
      <div className="row py-5 justify-content-center">
        <FormBtn text="Acessar" className="auth-btn" />
      </div>
    </form>
  );
};

export default FormLogin;
