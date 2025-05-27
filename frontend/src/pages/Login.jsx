import { Button } from 'react-bootstrap';
import '../styles/login.css'
import '../styles/form.css'
import InputField from '../components/UI/InputField';


const Login = () => {
  const campos = [
    { label: 'E-Mail', name: 'email', type: 'email', size: 'medium-input' },
    { label: 'Senha', name: 'senha', type: 'password', size: 'medium-input' }
  ];

  return (
    <div className='cont flex-center'>
      <div className='row w-100'>
        <h1 className='text-center pg-title'>SGO</h1>
      </div>
      <div className='row w-100 pt-5'>
        <div className='col'></div>
        <form className='col-xl-6 col-lg-7 col-md-8 col-sm-10 col-12 bg-white my-form'>
          <div className='row py-4'>
            <h2 className='text-center'>Acessar Sistema</h2>
          </div>
          <div className="row d-flex flex-column align-items-center">
            {campos.map(campo => (
                <div className={`py-2 ${campo.size}`}>
                  <InputField label={campo.label} name={campo.name} type={campo.type} />
                </div>
              )
            )}
          </div>
          <div className='row py-4'>
            <a className='text-center my-link' href='...'>Esqueci Minha Senha</a>
          </div>
          <div className='row pt-1 pb-5 justify-content-center'>
            <Button className='form-btn' variant='primary' type='submit'>Acessar</Button>
          </div>
        </form>
        <div className='col'></div>
      </div>
    </div>
  )
}


export default Login
