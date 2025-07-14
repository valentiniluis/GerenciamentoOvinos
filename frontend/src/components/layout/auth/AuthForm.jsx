import FormLogin from "../forms/login/FormLogin.jsx";
import FormCadastro from "../forms/login/FormCadastro.jsx";
import ApiAlert from '../../UI/ApiAlert.jsx';


const AuthenticationForm = ({ authMode }) => {
  return (
    <>
      <div className='form-container'>
        {authMode === 'signup'
          ? <FormCadastro />
          : <FormLogin />
        }
      </div>
      <ApiAlert />
    </>
  );
}


export default AuthenticationForm;