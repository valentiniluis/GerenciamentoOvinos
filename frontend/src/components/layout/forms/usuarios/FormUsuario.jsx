import '../../../../styles/form.css';
import { Form } from 'react-router-dom';
import RenderFields from '../RenderFields.jsx';
import ApiAlert from '../../../UI/ApiAlert.jsx';
import FormBtn from '../../../UI/FormBtn.jsx';
import ErrorParagraph from '../../../UI/ErrorParagraph.jsx';
import Confirmation from '../../modal/Confirmation.jsx';
import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGroups } from '../../../../util/loaders.js';
import { useContext } from 'react';
import { PermissionsContext } from '../../../../store/permissions-context.jsx';
import { Spinner } from 'react-bootstrap';


const CamposForm = ({ dados, grupos, metodo, excluirUsuario }) => {
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

  let formButtons = (
    <FormBtn text="Cadastrar" type="submit" />
  );

  if (metodo === 'POST') {
    const senha = [
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
      }
    ];
    fields = fields.concat(senha);
  }
  else if (metodo === 'PUT') {
    formButtons = (
      <>
        <FormBtn text="Salvar" type="submit" />
        <Confirmation
          btnText="Excluir"
          title="Confirmar Exclusão"
          text="Deletar um usuário é uma ação permanente. Você tem certeza?"
          onClick={excluirUsuario}
          variant="danger"
        >
          Excluir Usuário
        </Confirmation>
      </>
    )
  };

  return (
    <>
      <RenderFields fields={fields} />
      <div className="row py-5 justify-content-center gap-5">
        {formButtons}
      </div>
    </>
  );
}


const FormUsuario = ({ dados, metodo, excluirUsuario }) => {
  const permissions = useContext(PermissionsContext);
  const formRef = useRef();

  const { data, isError, isPending } = useQuery({
    queryKey: ['grupos'],
    queryFn: getGroups,
    enabled: permissions.perm_alter_usuario_grupo
  });

  useEffect(() => {
    if (!data?.isError) formRef?.current?.reset();
  }, [data]);

  let content;
  if (isPending) {
    content = <Spinner role='status' />;
  }
  else if (isError) {
    content = <ErrorParagraph error={{ message: "Não foi possível carregar os grupos." }} />
  }
  else if (data) {
    const groups = data.groups?.
      filter(group => group.nome !== 'Administrador').
      map((group) => ({ name: group.nome, value: group.nome }));
    content = <CamposForm dados={dados} metodo={metodo} excluirUsuario={excluirUsuario} grupos={groups} />
  }

  return (
    <Form method={metodo} className="medium-input" ref={formRef}>
      {content}
      <ApiAlert />
    </Form>
  );
};

export default FormUsuario;
