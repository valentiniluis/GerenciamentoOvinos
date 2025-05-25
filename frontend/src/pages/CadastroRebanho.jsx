import React from 'react';
import { Button } from 'react-bootstrap';
import '../styles/sidebar.css';
import Sidebar from '../components/layout/sidebar/Sidebar';
import InputField from '../components/UI/InputField';

const CadastroRebanho = () => {
  const campos = [
    { name: 'Número do Brinco', nameSize: 4, inputSize: 4 },
    { name: 'Brinco da Mãe', nameSize: 4, inputSize: 4 },
    { name: 'Raça', nameSize: 4, inputSize: 4 },
    { name: 'Sexo', nameSize: 4, inputSize: 2 },
    { name: 'Data de Nascimento', nameSize: 4, inputSize: 2 },
    { name: 'Finalidade', nameSize: 4, inputSize: 2 },
    { name: 'Peso Nascimento (kg)', nameSize: 4, inputSize: 2 },
    { name: 'Observação', nameSize: 4, inputSize: 6 },
  ];

  return (
    <div className="row m-0">
      <Sidebar user="Emerson" paginaAtual={'Rebanho'} />
      <main className="col cont">
        <div className="row">
          <h1 className="page-title">Cadastrar Ovelha</h1>
        </div>
        <form className="row" action="/cadastrarOvelha" method="POST">
          <h4>Informações</h4>
          {campos.map((campo) => {
            return (
              <InputField
                key={campo.name}
                name={campo.name}
                nameSize={campo.nameSize}
                inputSize={campo.inputSize}
              />
            );
          })}
          <div className="row py-5 justify-content-center">
            <Button className="form-btn" variant="primary" type="submit">
              Cadastrar
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CadastroRebanho;
