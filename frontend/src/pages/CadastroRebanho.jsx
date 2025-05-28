import { Button } from 'react-bootstrap';
import '../styles/sidebar.css';
import '../styles/form.css'
import Sidebar from '../components/layout/sidebar/Sidebar';
import InputField from '../components/UI/InputField';
import { useState } from 'react';

const CadastroRebanho = () => {
  // const campos = [
  //   { label: 'Número do Brinco', name: 'numero_brinco', size: 'medium-input' },
  //   { label: 'Brinco da Mãe', name: 'brinco_mae', size: 'medium-input', elementsInRow: 2 },
  //   { label: 'Ovino Comprado', name: 'comprado', type: 'checkbox', size: 'small-input', elementsInRow: 2 },
  //   { label: 'Raça', name: 'raca', size: 'medium-input' },
  //   { label: 'Sexo', name: 'sexo', size: 'small-input', elementsInRow: 2 },
  //   { label: 'Data de Nascimento', name: 'data_nasc', type: 'date', size: 'small-input', elementsInRow: 2 },
  //   { label: 'Finalidade', name: 'finalidade', size: 'small-input', elementsInRow: 2 },
  //   { label: 'Peso Nascimento (kg)', name: 'peso_nasc', type: 'number', size: 'small-input', rowStatus: 'close', elementsInRow: 2 },
  //   { label: 'Observação', name: 'observacao', size: 'large-input' }
  // ];

  const [comprado, setComprado] = useState(false);

  const changeComprado = event => {
    // se o checkbox estiver marcardo, o state 'comprado' será = true.
    // com isso, faz-se um reset no valor do input 'Brinco Mãe'
    setComprado(event.target.checked);
    if (comprado === false) document.getElementById('brinco_mae').value = '';
  }

  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={'Rebanho'} />
      <main className="col cont px-5">
        <div className="row py-3">
          <h1 className="page-title text-center">Cadastrar Ovelha</h1>
        </div>
        <div className='form-cont flex-center'>
          <form action="/ovino" method="POST">
            <h4 className='py-3'>Informações</h4>
            <div className="row py-2 medium-input">
              <InputField label='Número do Brinco' name='numero_brinco' />
            </div>
            <div className="row py-2 d-flex justify-content-between">
              <div className="medium-input">
                <label htmlFor="brinco_mae">Brinco da Mãe</label>
                <input id='brinco_mae' type='text' name='brinco_mae' className="form-input" disabled={comprado === true} />
              </div>
              <div className="small-input text-center">
                <label htmlFor="comprado">Ovino Comprado</label>
                <input id='comprado' type='checkbox' name='comprado' className="form-input" onChange={changeComprado} value={true} />
              </div>
            </div>
            <div className="row py-2 medium-input">
              <InputField label='Raça' name='raca' />
            </div>
            <div className="row py-2 d-flex justify-content-between">
              <div className="small-input">
                <InputField label='Sexo' name='sexo' />
              </div>
              <div className="small-input">
                <InputField label='Data Nascimento' name='data_nasc' type='date' />
              </div>
            </div>
            <div className="row py-2 d-flex justify-content-between">
              <div className="small-input">
                <InputField label='Finalidade' name='finalidade' />
              </div>
              <div className="small-input">
                <label className="my-label" htmlFor='peso_nasc'>Peso Nascimento (kg)</label>
                <input id='peso_nasc' type='number' name='peso_nasc' className="form-input" step="0.001" />
              </div>
            </div>
            <div className="row py-2 large-input">
              <InputField label='Observação' name='observacao' />
            </div>
            <div className="row py-5 justify-content-center">
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
