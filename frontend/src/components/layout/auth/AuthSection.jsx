import { useSearchParams } from "react-router-dom";
import AuthNav from "./AuthNav";
import FormCadastro from "../forms/login/FormCadastro";
import FormLogin from "../forms/login/FormLogin";


const AuthSection = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const Form = (mode === 'signup') ? FormCadastro : FormLogin;

  return (
    <>
      <AuthNav currentMode={mode} />
      <Form />
    </>
  );
}


export default AuthSection;