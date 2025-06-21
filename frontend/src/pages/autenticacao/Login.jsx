import '../../styles/login.css';
import '../../styles/form.css';
import PageTitle from '../../components/UI/PageTitle';
import FormLogin from '../../components/layout/forms/login/FormLogin';

const Login = () => {
  return (
    <div className="cont flex-center">
      <PageTitle title={'SGO'} />
      <div className="row w-100">
        <div className="col"></div>
        <FormLogin />
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Login;
