import '../../../styles/form.css';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import RenderFields from './RenderFields';

import api from '../../../api/request';

const FormCadastroUsuario = () => {
  const rowPadding = 'py-3';
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/grupos');
      const data = response.data;
      setGroups(data);
    }
    fetchData();
  }, []);

  const grupos = groups.map(group => ({ name: group.nome, value: group.nome }));

  const fields = [
    {
      padding: rowPadding,
      wrapper: {
        class: 'medium-input'
      },
      inputProps: {
        label: 'Nome',
        id: "nome",
        type: "text",
        name: "nome",
        placeholder: "Ex. João da Silva",
        required: true

      }
    },
    {
      padding: rowPadding,
      wrapper: {
        class: 'medium-input'
      },
      inputProps: {
        label: 'E-Mail',
        id: "email",
        type: "email",
        name: "email",
        placeholder: "email@exemplo.com",
        required: true
      }
    },
    {
      padding: rowPadding,
      wrapper: {
        class: 'medium-input'
      },
      inputProps: {
        label: 'Grupo',
        id: 'grupo',
        name: 'grupo',
        required: true,
        options: [{ name: 'Selecione um grupo', value: "", hidden: true }].concat(grupos)
      }
    },
    {
      padding: rowPadding,
      wrapper: {
        class: 'small-input'
      },
      inputProps: {
        label: 'Senha',
        id: "senha",
        type: "password",
        name: "senha"
      }
    },
    {
      padding: rowPadding,
      wrapper: {
        class: 'small-input'
      },
      inputProps: {
        label: 'Confirmação Senha',
        id: "confirmacao_senha",
        type: "password",
        name: "confirmacao_senha"
      }
    }
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const jsonData = Object.fromEntries(formData.entries());
      const postData = { ...jsonData, data_cadastro: new Date() };
      const result = await api.post('/usuarios', postData);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <RenderFields fields={fields} />
      <div className="row pt-5 justify-content-center">
        <Button className="form-btn" variant="primary" type="submit">
          Cadastrar
        </Button>
      </div>
    </form>
  )
}

export default FormCadastroUsuario;