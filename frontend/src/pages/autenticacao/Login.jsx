import '../../styles/login.css';
import '../../styles/form.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/UI/PageTitle';
import InputField from '../../components/UI/InputField';
import FieldWrapper from '../../components/UI/FieldWrapper';
import FormRow from '../../components/UI/FormRow';


const Login = () => {
  const rowPadding = 'py-1';
  const inputs = [
    {
      label: 'E-Mail',
      id: 'email',
      name: 'email',
      type: 'email',
      className: 'form-input'
    },
    {
      label: 'Senha',
      id: 'senha',
      name: 'senha',
      type: 'password',
      className: 'form-input',
    }
  ];

  const handleLogin = () => {
  }

  return (
    <div className="cont flex-center">
      <PageTitle title={'SGO'} />
      <div className="row w-100">
        <div className="col"></div>
        <form className="col-xl-6 col-lg-7 col-md-8 col-sm-10 col-12 bg-white my-form" onSubmit={handleLogin}>
          <div className="row py-4">
            <h2 className="text-center">Acessar Sistema</h2>
          </div>
          <section className="row d-flex flex-column align-items-center gap-3">
            {inputs.map(input => (
                <FieldWrapper key={input.label} wrapperClass={`medium-input ${rowPadding}`}>
                  <InputField {...input} />
                </FieldWrapper>
            ))}
          </section>
          <FormRow padding="py-4 my-2">
            <Link className="text-center my-link" to="...">
              Esqueci Minha Senha
            </Link>
          </FormRow>
          <div className="row pt-1 pb-5 justify-content-center">
            <Button className="form-btn" variant="primary" type="submit">
              Acessar
            </Button>
          </div>
        </form>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Login;
