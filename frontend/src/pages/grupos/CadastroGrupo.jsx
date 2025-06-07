import '../../styles/form.css';
import { Button, Form } from 'react-bootstrap';
import PageTitle from '../../components/UI/PageTitle';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import InputField from '../../components/UI/InputField';
import FormRow from '../../components/UI/FormRow';
import ApiAlert from '../../components/UI/ApiAlert';

import api from '../../api/request';
import { useState } from 'react';

const CadastroGrupo = () => {

  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccesMsg] = useState(null);


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
      )
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
      )
    },
    {
      label: 'Permissões',
      size: 'large-input',
      element: (
        <Form.Group id="permissoes" name="permissoes" className='text-nowrap'>
          <Form.Check
            className='py-1'
            label="Visualização de Dados (Relatórios e Gráficos)"
            id="visualizar_dados"
            type="checkbox"
            name="visualizar_dados"
            value={true}
            defaultChecked
          />
          <Form.Check
            className='py-1'
            label="Visualização do Rebanho"
            id="visualizar_rebanho"
            type="checkbox"
            name="visualizar_rebanho"
            value={true}
            defaultChecked
          />
          <Form.Check
            className='py-1'
            label="Visualização do Calendário"
            id="visualizar_calendario"
            type="checkbox"
            name="visualizar_calendario"
            value={true}
            defaultChecked
          />
          <Form.Check
            className='py-1'
            label="Visualização de Usuários e Grupos"
            id="visualizar_grupos"
            type="checkbox"
            name="visualizar_grupos"
            value={true}
            defaultChecked
          />
          <Form.Check
            className='py-1'
            label="Alteração do Rebanho"
            id="alterar_rebanho"
            type="checkbox"
            name="alterar_rebanho"
            value={true}
          />
          <Form.Check
            className='py-1'
            label="Alteração de Eventos no Calendário"
            id="alterar_calendario"
            type="checkbox"
            name="alterar_calendario"
            value={true}
          />
          <Form.Check
            className='py-1'
            label="Alteração de Usuários e Grupos"
            id="alterar_grupos"
            type="checkbox"
            name="alterar_grupos"
            value={true}
          />
        </Form.Group>
      )
    }
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg(null);
    setSuccesMsg(null);

    try {
      const formData = new FormData(event.target);
      const jsonData = Object.fromEntries(formData.entries());
      const postData = { ...jsonData, data_criacao: new Date() };
      const result = await api.post('/grupos', postData);
      console.log(result);

      setSuccesMsg('Grupo cadastrado com sucesso');

      event.target.reset();
    } catch (err) {
      console.log(err)

      if (err.response.data.error) {
        setErrorMsg(err.response.data.error);
      } else {
        setErrorMsg('Erro inesperado. Tente novamente mais tarde');
      }
    }
  }

  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={'Grupos'} />
      <main className="col cont px-5">
        <PageTitle title="Cadastrar Grupo" />
        <div className="form-cont px-4 flex-center">
          <form onSubmit={handleSubmit} className='medium-input'>
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
        <ApiAlert variant="danger" message={errorMsg} onClose={() => setErrorMsg(null)} />
        <ApiAlert variant="success" message={successMsg} onClose={() => setSuccesMsg(null)} />
      </main>
    </div>
  );
};

export default CadastroGrupo;
