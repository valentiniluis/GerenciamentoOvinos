import '../../../../styles/form.css';
import { useRouteLoaderData, Form, useSubmit } from 'react-router-dom';
import RenderFields from '../RenderFields.jsx';
import ApiAlert from '../../../UI/ApiAlert.jsx';
import FormBtn from '../../../UI/FormBtn.jsx';
import ErrorParagraph from '../../../UI/ErrorParagraph.jsx';
import DeleteConfirmation from '../../modal/DeleteConfirmation.jsx';


const FormCadastroUsuario = ({ dados, metodo }) => {
  const submit = useSubmit();
  const response = useRouteLoaderData('user');
  if (response.isError) return <ErrorParagraph error={response} />

  const groups = response.data;
  const grupos = groups.map((group) => ({
    name: group.nome,
    value: group.nome,
  }));

  const rowPadding = 'py-3';
  let fields = [
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
        defaultValue: dados?.nome
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
        defaultValue: dados?.email
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
        defaultValue: dados?.grupo_nome,
        options: [
          { name: 'Selecione um grupo', value: '', hidden: true },
        ].concat(grupos),
      },
    }
  ];

  if (metodo === 'POST') {
    const senha = [{
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
    }];
    fields = fields.concat(senha);
  }

  let formButtons = (
    <FormBtn text="Cadastrar" type="submit" />
  );

  if (metodo === 'PUT') {
    const handleDelete = () => submit(null, { action: `/usuario/${dados.email}/excluir`, method: 'DELETE' });
    formButtons = (
      <>
        <FormBtn text="Salvar" type="submit" />
        <DeleteConfirmation
          buttonText="Excluir Usuário"
          title="Confirmar Exclusão"
          text="Deletar um usuário é uma ação permanente. Você tem certeza?"
          confirm={handleDelete}
        />
      </>
    )
  };


  return (
    <Form method={metodo} className="medium-input">
      <RenderFields fields={fields} />
      <div className="row py-5 justify-content-center gap-5">
        {formButtons}
      </div>
      <ApiAlert />
    </Form>
  );
};

export default FormCadastroUsuario;
