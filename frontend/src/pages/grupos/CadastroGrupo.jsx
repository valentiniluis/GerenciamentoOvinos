import '../../styles/form.css';
import { Button, Form } from 'react-bootstrap';
import PageTitle from '../../components/UI/PageTitle';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import InputField from '../../components/UI/InputField';
import FormRow from '../../components/UI/FormRow';

import api from '../../api/request';

const CadastroGrupo = () => {
  const rowPadding = 'py-3';
  const rows = [
    {
      label: 'Nome do Grupo',
      size: 'medium-input',
      element: (
        <Form.Control
          id="nome"
          type="text"
          name="nome"
          placeholder="Ex. Administradores"
          required
        />
      ),
    },
    {
      label: 'Descrição',
      size: 'medium-input',
      element: (
        <Form.Control
          id="descricao"
          type="descricao"
          name="descricao"
          placeholder="Descrição Opcional"
        />
      ),
    },
    {
      label: 'Permissões',
      size: 'small-input',
      element: (
        <Form.Group id="permissoes" name="permissoes">
          <Form.Check
            label="Acesso a Dados"
            id="acesso_dados"
            type="checkbox"
            name="acesso_dados"
            defaultChecked
          />
          <Form.Check
            label="Acesso ao Rebanho"
            id="acesso_rebanho"
            type="checkbox"
            name="acesso_rebanho"
            defaultChecked
          />
          <Form.Check
            label="Acesso aos Usuários"
            id="acesso_usuarios"
            type="checkbox"
            name="acesso_usuarios"
          />
          <Form.Check
            label="Acesso aos Grupos"
            id="acesso_grupos"
            type="checkbox"
            name="acesso_grupos"
          />

        </Form.Group>
      ),
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const jsonData = Object.fromEntries(formData.entries());
      const postData = { ...jsonData, data_criacao: new Date() };
      const result = await api.post('/grupos', postData);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={'Grupos'} />
      <main className="col cont px-5">
        <PageTitle title="Cadastrar Grupo" />
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

export default CadastroGrupo;
