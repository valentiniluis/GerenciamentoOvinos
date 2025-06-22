import './auth.css';
import { useState } from 'react';
import FormCadastro from '../../components/layout/forms/login/FormCadastro';
import FormLogin from '../../components/layout/forms/login/FormLogin';


const AuthenticationForm = ({ authMode }) => {
  return (
    <div className='form-container'>
      {authMode === 'Login'
        ? <FormLogin />
        : <FormCadastro />
      }
    </div>
  );
}

const AuthNav = ({ currentMode, onChangeMode }) => {
  return (
    <nav className="auth-navbar">
      <menu>
        <button 
          onClick={() => onChangeMode('Login')} 
          className={`navbar-button ${currentMode === 'Login' ? 'active' : ''}`}>
          Login
        </button>
        <button 
          onClick={() => onChangeMode('Cadastro')} 
          className={`navbar-button ${currentMode === 'Cadastro' ? 'active' : ''}`}>
          Cadastro
        </button>
      </menu>
    </nav>
  )
}

const AuthSection = () => {
  const [authMode, setAuthMode] = useState('Login');

  return (
    <>
      <AuthNav onChangeMode={setAuthMode} currentMode={authMode} />
      <AuthenticationForm authMode={authMode} />
    </>
  );
}


const Autenticacao = () => {
  return (
    <div className="row cont beige">
      <section className="col-xxl-6 col-0 p-0 bg-image-container">
      </section>
      <main className="col p-0 auth-container">
        <AuthSection />
      </main>
    </div>
  );
}

export default Autenticacao;