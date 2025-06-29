import '../../../../styles/form.css';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import RenderFields from '../RenderFields.jsx';
import ApiAlert from '../../../UI/ApiAlert.jsx';
import FormBtn from '../../../UI/FormBtn.jsx';
import ErrorParagraph from '../../../UI/ErrorParagraph.jsx';

import api from '../../../../api/request';

const FormCadastroUsuario = () => {
  const rowPadding = 'py-3';
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const response = useLoaderData();
  if (response.isError) return <ErrorParagraph error={response} />
  
  const groups = response.data;
  const grupos = groups.map((group) => ({
    name: group.nome,
    value: group.nome,
  }));

  const fields = [
    {
      wrapper: {
        class: rowPadding,
        size: 'large-input',
      },
      inputProps: {
        label: 'Nome',
        id: 'nome',
        type: 'text',
        name: 'nome',
        placeholder: 'Ex. João da Silva',
        required: true,
      },
    },
    {
      wrapper: {
        class: rowPadding,
        size: 'large-input',
      },
      inputProps: {
        label: 'E-Mail',
        id: 'email',
        type: 'email',
        name: 'email',
        placeholder: 'email@exemplo.com',
        required: true,
      },
    },
    {
      wrapper: {
        class: rowPadding,
        size: 'large-input',
      },
      inputProps: {
        label: 'Grupo',
        id: 'grupo_nome',
        name: 'grupo_nome',
        required: true,
        options: [
          { name: 'Selecione um grupo', value: '', hidden: true },
        ].concat(grupos),
      },
    },
    {
      wrapper: {
        class: rowPadding,
        size: 'medium-input',
      },
      inputProps: {
        label: 'Senha',
        id: 'senha',
        type: 'password',
        name: 'senha',
      },
    },
    {
      wrapper: {
        class: rowPadding,
        size: 'medium-input',
      },
      inputProps: {
        label: 'Confirmação Senha',
        id: 'confirmacao_senha',
        type: 'password',
        name: 'confirmacao_senha',
      },
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const jsonData = Object.fromEntries(formData.entries());
      const now = new Date().toISOString().split('T')[0];
      const postData = { ...jsonData, data_cadastro: now };
      const result = await api.post('/usuarios', postData);
      console.log(result);
      setSuccessMsg(result.data.message);
      event.target.reset();
    } catch (err) {
      console.log(err);
      setErrorMsg(
        err.response.data.message ||
          'Erro inesperado. Tente novamente mais tarde',
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="medium-input">
      <RenderFields fields={fields} />
      <div className="row py-5 justify-content-center">
        <FormBtn text="Cadastrar" type="submit"/>
      </div>
      <ApiAlert
        variant="danger"
        message={errorMsg}
        onClose={() => setErrorMsg(null)}
      />
      <ApiAlert
        variant="success"
        message={successMsg}
        onClose={() => setSuccessMsg(null)}
      />
    </form>
  );
};

export default FormCadastroUsuario;
