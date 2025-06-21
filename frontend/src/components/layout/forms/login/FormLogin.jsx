import { Link } from 'react-router-dom';
import FormRow from '../../../UI/FormRow';
import RenderFields from '../RenderFields';
import FormBtn from '../../../UI/FormBtn';

import api from '../../../../api/request';

const FormLogin = () => {
  const rowPadding = 'py-3';
  const inputs = [
    {
      padding: rowPadding,
      wrapper: {
        class: 'medium-input m-auto',
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
      padding: rowPadding,
      wrapper: {
        class: 'medium-input m-auto',
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
    <form
      className="col-xl-6 col-lg-7 col-md-8 col-sm-10 col-12 bg-white my-form"
      onSubmit={handleLogin}
    >
      <div className="row py-4">
        <h2 className="text-center">Acessar Sistema</h2>
      </div>
      <section className="medium-input m-auto">
        <RenderFields fields={inputs} />
      </section>
      <FormRow padding="py-4 my-2">
        <Link className="text-center my-link" to="...">
          Esqueci Minha Senha
        </Link>
      </FormRow>
      <div className="row py-5 justify-content-center">
        <FormBtn text="Acessar" />
      </div>
    </form>
  );
};

export default FormLogin;
