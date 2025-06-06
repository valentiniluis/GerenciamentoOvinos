import '../../styles/form.css';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import PageTitle from '../../components/UI/PageTitle';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import InputField from '../../components/UI/InputField';
import FormRow from '../../components/UI/FormRow';

import api from '../../api/request';

const CadastroUsuario = () => {
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
        <Form.Select id="grupo" type="text" name="grupo" required>
          <option value="" hidden>Selecione o Grupo</option>
          {groups.map(group => (
            <option key={group.nome} value={group.nome}>{group.nome}</option>
          ))}
        </Form.Select>
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const jsonData = Object.fromEntries(formData.entries());
      const postData = {...jsonData, data_cadastro: new Date()};
      const result = await api.post('/usuarios', postData);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={'Usuários'} />
      <main className="col cont px-5">
        <PageTitle title="Cadastrar Usuário" />
        <div className="form-cont px-4 flex-center">
          <form onSubmit={handleSubmit}>
            {rows.map((row, index) => (
              <FormRow padding={rowPadding} key={`Form Row ${index + 1}`}>
                <InputField
                  label={row.label}
                  input={row.element}
                  size={row.size}
                />
              </FormRow>
            ))}
            <div className="row pt-5 justify-content-center">
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
