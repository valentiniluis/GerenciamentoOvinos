import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

import '../styles/form.css';

import PageTitle from '../components/UI/PageTitle';
import Sidebar from '../components/layout/sidebar/Sidebar';
import InputField from '../components/UI/InputField';
import FormRow from '../components/UI/FormRow';

const PerfilUsuario = () => {
  const [readMode, setReadMode] = useState(true);

  const rowPadding = 'py-2';
  const rows = [
    {
      label: 'Nome',
      size: 'medium-input',
      element: (
        <Form.Control
          id="nome"
          type="text"
          name="nome"
          readOnly={readMode}
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
          readOnly={readMode}
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
          readOnly={readMode}
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
          readOnly={readMode}
          required
        />
      ),
    }
  ];

  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={'Usuários'} />
      <main className="col cont px-5">
        <PageTitle title="Meu Perfil" />
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
                {
                  readMode
                  ? 'Editar Dados'
                  : 'Salvar Alterações'
                }
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PerfilUsuario;
