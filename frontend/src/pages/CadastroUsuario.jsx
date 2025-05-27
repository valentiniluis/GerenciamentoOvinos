import { Button } from 'react-bootstrap';
import '../styles/sidebar.css';
import '../styles/form.css'
import Sidebar from '../components/layout/sidebar/Sidebar';
import InputField from '../components/UI/InputField';

const CadastroUsuario = () => {
  const campos = [
    { label: 'Nome do Usuário', name: 'nome', size: 'medium-input' },
    { label: 'E-Mail', name: 'email', type: 'email', size: 'medium-input' },
    { label: 'Grupo de Usuários', name: 'grupo', size: 'medium-input' },
    { label: 'Senha', labelSize: 2, name: 'senha', type: 'password', size: 'small-input' },
    { label: 'Confirmar Senha', name: 'confirmacao_senha', type: 'password', size: 'small-input' }
  ];

  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={'Usuários'} />
      <main className="col cont px-5">
        <div className="row py-5">
          <h1 className="page-title text-center">Cadastrar Usuário</h1>
        </div>
        <div className='form-cont px-4 flex-center'>
          <form action="/usuario" method="POST">
            {campos.map((campo) => {
              return (
                <div className={`row py-2 ${campo.size}`}>
                  <InputField key={campo.name} label={campo.label} name={campo.name} type={campo.type ?? 'text'} />
                </div>
              );
            })}
            <div className="row pt-5 mt-5 justify-content-center">
              <Button className="form-btn" variant="primary" type="submit">
                Cadastrar
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CadastroUsuario;
