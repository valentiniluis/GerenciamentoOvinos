import { Link } from "react-router-dom";

const AuthNav = ({ currentMode }) => {
  return (
    <nav className="auth-navbar">
      <menu>
        <Link 
          to="/entrar?mode=login"
          className={`navbar-link ${currentMode === 'login' ? 'active' : ''}`}
        >
          Login
        </Link>
        <Link 
          to="/entrar?mode=signup"
          className={`navbar-link ${currentMode === 'signup' ? 'active' : ''}`}
        >
          Cadastrar
        </Link>
      </menu>
    </nav>
  )
}


export default AuthNav;