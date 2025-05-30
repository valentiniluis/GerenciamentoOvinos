import { Button } from 'react-bootstrap';

import '../styles/login.css'
import '../styles/form.css'

import InputField from '../components/UI/InputField';

const Login = () => {
  const padding = 'py-3';
  const rows = [
    {
      element: <input id='email' name='email' type='email' className='form-input' />,
      label: 'E-Mail', size: 'medium-input', padding
    },
    {
      element: <input id='senha' name='senha' type='password' className='form-input' />,
      label: 'Senha', size: 'medium-input', padding
    }
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
            {rows.map(row => (
              <InputField label={row.label} input={row.element} size={row.size} />
            ))}
          </div>
          <div className='row py-4'>
            <a className='text-center my-link no-decoration' href='...'>Esqueci Minha Senha</a>
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
