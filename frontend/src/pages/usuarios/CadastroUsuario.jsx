import { Button, Form } from 'react-bootstrap';

import '../../styles/form.css';

import PageTitle from '../../components/UI/PageTitle';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import InputField from '../../components/UI/InputField';
import FormRow from '../../components/UI/FormRow';

const CadastroUsuario = () => {
  const rowPadding = 'py-3';
  const rows = [
    {
      label: 'Nome',
      size: 'medium-input',
      element: (
        <Form.Control
          id="nome"
          type="text"
          name="nome"
          placeholder="Ex. João da Silva"
          required
        />
      ),
    },
    {
      label: 'E-Mail',
      size: 'medium-input',
      element: (
        <Form.Control
          id="email"
          type="email"
          name="email"
          placeholder="email@exemplo.com"
          required
        />
      ),
    },
    {
      label: 'Grupo',
      size: 'medium-input',
      element: (
        <Form.Control
          id="grupo"
          type="text"
          name="grupo"
          placeholder="Ex. Administradores"
        />
      ),
    },
    {
      label: 'Senha',
      size: 'small-input',
      element: (
        <Form.Control
          id="senha"
          type="password"
          name="senha"
          required
        />
      ),
    },
    {
      label: 'Confirmação Senha',
      size: 'small-input',
      element: (
        <Form.Control
          id="confirmacao_senha"
          type="password"
          name="confirmacao_senha"
          required
        />
      ),
    },
  ];

  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={'Usuários'} />
      <main className="col cont px-5">
        <PageTitle title="Cadastrar Usuário" />
        <div className="form-cont px-4 flex-center">
          <form action="/usuario" method="POST">
            {rows.map((row, index) => (
              <FormRow padding={rowPadding} key={`Form Row ${index + 1}`}>
                <InputField
                  label={row.label}
                  input={row.element}
                  size={row.size}
                />
              </FormRow>
            ))}
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
