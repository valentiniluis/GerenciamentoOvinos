import { Form as RouterForm, useSubmit } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import '../../../../styles/form.css';
import RenderFields from '../RenderFields.jsx';
import FormRow from '../../../UI/FormRow.jsx';
import FormBtn from '../../../UI/FormBtn.jsx';
import DeleteConfirmation from '../../modal/DeleteConfirmation.jsx';
import ApiAlert from '../../../UI/ApiAlert.jsx';


const TEXT_PADDING = 'py-2';
const CHECKBOX_PADDING = 'py-1';

const FormCadastroGrupo = ({ dados, metodo }) => {
  const submit = useSubmit();

  const TEXT_FIELDS = [
    {
      wrapper: {
        class: TEXT_PADDING,
        size: 'large-input'
      },
      inputProps: {
        label: 'Nome do Grupo',
        type: "text",
        id: "nome",
        name: "nome",
        placeholder: "Ex. Auxiliares",
        required: true,
        defaultValue: dados?.nome
      }
    },
    {
      wrapper: {
        class: TEXT_PADDING,
        size: 'large-input'
      },
      inputProps: {
        label: 'Descrição',
        type: "descricao",
        id: "descricao",
        name: "descricao",
        placeholder: "Descrição Opcional",
        defaultValue: dados?.descricao
      }
    }
  ];

  const CHECKBOX_FIELDS = [
    {
      wrapper: {
        class: CHECKBOX_PADDING + ' d-flex gap-3',
        size: 'large-input'
      },
      inputProps: {
        className: 'text-nowrap',
        type: 'checkbox',
        value: true,
        label: "Visualização do Rebanho",
        id: "visualizar_rebanho",
        name: "visualizar_rebanho",
        defaultChecked: (metodo === 'POST') ? true : dados?.perm_visual_rebanho
      }
    },
    {
      wrapper: {
        class: CHECKBOX_PADDING + ' d-flex gap-3',
        size: 'large-input'
      },
      inputProps: {
        className: 'text-nowrap',
        type: 'checkbox',
        value: true,
        label: "Visualização do Calendário",
        id: "visualizar_calendario",
        name: "visualizar_calendario",
        defaultChecked: (metodo === 'POST') ? true : dados?.perm_visual_calendario
      }
    },
    {
      wrapper: {
        class: CHECKBOX_PADDING + ' d-flex gap-3',
        size: 'large-input'
      },
      inputProps: {
        className: 'text-nowrap',
        type: 'checkbox',
        value: true,
        label: "Visualização de Usuários e Grupos",
        id: "visualizar_grupos",
        name: "visualizar_grupos",
        defaultChecked: (metodo === 'POST') ? true : dados?.perm_visual_grupos
      }
    },
    {
      wrapper: {
        class: CHECKBOX_PADDING + ' d-flex gap-3',
        size: 'large-input'
      },
      inputProps: {
        className: 'text-nowrap',
        type: 'checkbox',
        value: true,
        label: "Alteração do Rebanho",
        id: "alterar_rebanho",
        name: "alterar_rebanho",
        defaultChecked: (metodo === 'POST') ? false : dados?.perm_alter_rebanho
      }
    },
    {
      wrapper: {
        class: CHECKBOX_PADDING + ' d-flex gap-3',
        size: 'large-input'
      },
      inputProps: {
        className: 'text-nowrap',
        type: 'checkbox',
        value: true,
        label: "Alteração de Eventos do Calendário",
        id: "alterar_calendario",
        name: "alterar_calendario",
        defaultChecked: (metodo === 'POST') ? false : dados?.perm_alter_calendario
      }
    },
    {
      wrapper: {
        class: CHECKBOX_PADDING + ' d-flex gap-3',
        size: 'large-input'
      },
      inputProps: {
        className: 'text-nowrap',
        type: 'checkbox',
        value: true,
        label: "Alteração de Usuários e Grupos",
        id: "alterar_grupos",
        name: "alterar_grupos",
        defaultChecked: (metodo === 'POST') ? false : dados?.perm_alter_usuario_grupo
      }
    }
  ];

  let formButtons = <FormBtn text="Cadastrar" type="submit" />;

  if (metodo === 'PUT') {
    const handleDelete = () => submit(null, { method: 'DELETE', action: `/grupo/${dados.nome}/excluir` });

    formButtons = (
      <>
        <FormBtn text="Salvar" type="submit" />
        <DeleteConfirmation
          buttonText="Excluir Grupo"
          title="Confirmar Exclusão"
          text="Ao excluir um grupo, os usuários pertencentes a ele também serão deletados. Você tem certeza?"
          confirm={handleDelete}
        />
      </>
    )
  }

  return (
    <RouterForm method={metodo} className='medium-input'>
      <RenderFields fields={TEXT_FIELDS} />
      <FormRow>
        <Form.Label className='my-label standalone-label pt-3'>Permissões</Form.Label>
      </FormRow>
      <RenderFields fields={CHECKBOX_FIELDS} />
      <div className="row py-5 justify-content-center gap-5">
        {formButtons}
      </div>
      <ApiAlert />
    </RouterForm>
  );
}

export default FormCadastroGrupo;