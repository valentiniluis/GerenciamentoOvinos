import { Button } from 'react-bootstrap';
import '../styles/sidebar.css';
import '../styles/form.css'
import Sidebar from '../components/layout/sidebar/Sidebar';
import InputField from '../components/UI/InputField';

const CadastroRebanho = () => {
  const campos = [
    { label: 'Número do Brinco', name: 'numero_brinco' },
    { label: 'Brinco da Mãe', name: 'brinco_mae' },
    { label: 'Ovino Comprado', name: 'comprado', type: 'radio'},
    { label: 'Raça', name: 'raca'},
    { label: 'Sexo', name: 'sexo' },
    { label: 'Data de Nascimento', name: 'data_nasc', type: 'date' },
    { label: 'Finalidade', name: 'finalidade' },
    { label: 'Peso Nascimento (kg)', name: 'peso_nasc', type: 'number' },
    { label: 'Observação', name: 'observacao' }
  ];

  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={'Rebanho'} />
      <main className="col cont px-5">
        <div className="row py-5">
          <h1 className="page-title">Cadastrar Ovelha</h1>
        </div>
        <div className='form-cont'>
          <form action="/ovino" method="POST">
            <h4 className='py-4'>Informações</h4>
            {campos.map((campo) => {
              return (
                <div className="row py-4">
                  <InputField key={campo.name} {...campo} />
                </div>
              );
            })}
            <div className="row py-5 w-75 justify-content-center">
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

export default CadastroRebanho;
