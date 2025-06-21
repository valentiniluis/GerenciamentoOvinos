import './BackgroundImage.css';
import './AuthNav.css';

import FormCadastro from '../../components/layout/forms/login/FormCadastro';

import { useState } from 'react';
import FormLogin from '../../components/layout/forms/login/FormLogin';
const AuthenticationForm = ({ authMode }) => {
  return (
    <div className='d-flex justify-content-center'>
      {authMode === 'Login'
        ? <FormLogin />
        : <FormCadastro />
      }
    </div>
  );
}

const AuthNav = ({ onChangeMode }) => {
  return (
    <nav className="auth-navbar">
      <menu>
        <button onClick={() => onChangeMode('Login')} className='navbar-button'>
          Login
        </button>
        <button onClick={() => onChangeMode('Cadastro')} className='navbar-button'>
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
      <AuthNav onChangeMode={setAuthMode} />
      <AuthenticationForm authMode={authMode} />
    </>
  );
}


const Autenticacao = () => {
  return (
    <div className="row cont">
      <section className="col p-0 bg-image-container">
      </section>
      <main className="col p-0 h-100">
        <AuthSection />
      </main>
    </div>
  );
}

export default Autenticacao;