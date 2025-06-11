import '../../../styles/form.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import RenderFields from './RenderFields';

import api from '../../../api/request';

const FormPerfilUsuario = () => {
  const [userData, setUserData] = useState({});
  const [readMode, setReadMode] = useState(true);
  const { email } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/usuarios/${email}`);
        const data = response.data;
        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [email]);


  const rowPadding = 'py-2';
  const fields = [
    {
      padding: rowPadding,
      wrapper: {
        class: 'medium-input',
      },
      inputProps: {
        label: 'Nome',
        size: 'medium-input',
        className: 'my-input',
        id: "nome",
        type: "text",
        name: "nome",
        readOnly: (readMode),
        defaultValue: userData.nome,
        required: true
      }
    },
    {
      padding: rowPadding,
      wrapper: {
        class: 'medium-input',
      },
      inputProps: {
        label: 'E-Mail',
        className: 'my-input',
        id: "email",
        type: "email",
        name: "email",
        readOnly: (readMode),
        defaultValue: userData.email,
        required: true
      }
    },
    {
      padding: rowPadding,
      wrapper: {
        class: 'medium-input',
      },
      inputProps: {
        label: 'Grupo',
        className: 'my-input',
        id: "grupo",
        type: "text",
        name: "grupo",
        readOnly: true,
        defaultValue: userData.grupo
      }
    }
  ];

  const handleEdit = (event) => {
    event.preventDefault();
  }

  const toggleReadMode = () => {
    setReadMode(prevMode => !prevMode);
  }

  return (
    <form onSubmit={handleEdit}>
      <RenderFields fields={fields} />
      <div className="row pt-5 mt-5 justify-content-evenly">
        <Button type={readMode ? 'button' : 'submit'} onClick={toggleReadMode} className="form-btn me-3" variant="primary">
          {readMode ? 'Editar Dados' : 'Salvar Alterações'}
        </Button>
        <Button className="form-btn ms-3" variant="primary" type="button">
          Alterar Senha
        </Button>
      </div>
    </form>
  );
}

export default FormPerfilUsuario;