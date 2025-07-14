import { useSearchParams } from "react-router-dom";
import AuthNav from "./AuthNav";
import AuthenticationForm from "./AuthForm";


const AuthSection = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';

  return (
    <>
      <AuthNav currentMode={mode} />
      <AuthenticationForm authMode={mode} />
    </>
  );
}


export default AuthSection;