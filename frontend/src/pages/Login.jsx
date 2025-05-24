import { Button } from 'react-bootstrap';
import '../styles/login.css'
import InputField from '../components/ui/InputField';

const Login = () => {

  return (
    <div className='cont flex-center'>
      <div className='row w-100'>
        <h1 className='text-center pg-title'>SGO</h1>
      </div>
      <div className='row w-100 pt-5'>
        <div className='col'></div>
        <main className='col-xl-6 col-lg-7 col-md-8 col-sm-10 col-12 bg-white my-form'>
          <div className='row py-5'>
            <h2 className='text-center'>Acessar Sistema</h2>
          </div>
          <div className='row py-2'>
            <InputField name='E-Mail'/>
          </div>
          <div className='row pt-1 pb-4'>
            <InputField name='Senha' />
          </div>
          <div className='row pt-3 pb-4'>
            <a className='text-center my-link' href='...'>Esqueci Minha Senha</a>
          </div>
          <div className='row pt-1 pb-5 justify-content-center'>
            <Button className='form-btn' variant='primary' type='submit'>Acessar</Button>
          </div>
        </main>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default Login
