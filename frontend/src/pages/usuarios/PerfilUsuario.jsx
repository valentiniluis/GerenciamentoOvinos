import { Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import '../../styles/form.css';

import PageTitle from '../../components/UI/PageTitle';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import InputField from '../../components/UI/InputField';
import FormRow from '../../components/UI/FormRow';

const PerfilUsuario = () => {
  const [userData, setUserData] = useState({});
  const [readMode, setReadMode] = useState(true);
  const { email } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `http://localhost:3000/usuarios/${email}`;
        const headers = { 'Content-Type': 'application/json' };
        const response = await fetch(url, headers);
        if (!response.ok)
          throw new Error('Não foi possível consultar os dados');
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [email]);


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
          value={userData.nome}
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
          value={userData.email}
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
          readOnly
          value={userData.grupo}
        />
      ),
    }
  ];

  const handleEdit = (event) => {
    event.preventDefault();
  }

  const toggleReadMode = () => {
    setReadMode(prevMode => !prevMode);
  }

  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={'Usuários'} />
      <main className="col cont px-5">
        <PageTitle title="Meu Perfil" />
        <div className="form-cont px-4 flex-center">
          <form onSubmit={handleEdit}>
            {rows.map((row, index) => (
              <FormRow padding={rowPadding} key={`Form Row ${index + 1}`}>
                <InputField
                  label={row.label}
                  input={row.element}
                  size={row.size}
                />
              </FormRow>
            ))}
            <div className="row pt-5 mt-5 justify-content-evenly">
              <Button type={readMode ? 'button' : 'submit'} onClick={toggleReadMode} className="form-btn me-3" variant="primary">
                {readMode ? 'Editar Dados' : 'Salvar Alterações'}
              </Button>
              <Button className="form-btn ms-3" variant="primary" type="button">
                Alterar Senha
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PerfilUsuario;
