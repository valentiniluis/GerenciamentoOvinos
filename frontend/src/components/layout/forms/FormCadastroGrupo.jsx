import '../../../styles/form.css';
import RenderFields from './RenderFields';
import { Form, Button } from 'react-bootstrap';
import FormRow from '../../UI/FormRow';


const FormCadastroGrupo = ({ onSubmit }) => {
  const textPadding = 'py-3';
  const textFields = [
    {
      padding: textPadding,
      wrapper: {
        class: 'medium-input'
      },
      inputProps: {
        label: 'Nome do Grupo',
        type: "text",
        id: "nome",
        name: "nome",
        placeholder: "Ex. Auxiliares",
        required: true
      }
    },
    {
      padding: textPadding,
      wrapper: {
        class: 'medium-input'
      },
      inputProps: {
        label: 'Descrição',
        type: "descricao",
        id: "descricao",
        name: "descricao",
        placeholder: "Descrição Opcional"
      }
    }
  ];

  const checkboxPadding = 'py-1';
  const checkboxFields = [
    {
      padding: checkboxPadding,
      wrapper: {
        class: 'large-input'
      },
      inputProps: {
        className: 'text-nowrap',
        type: 'checkbox',
        value: true,
        label: "Visualização de Dados (Relatórios e Gráficos)",
        id: "visualizar_dados",
        name: "visualizar_dados",
        defaultChecked: true
      }
    },
    {
      padding: checkboxPadding,
      wrapper: {
        class: 'large-input'
      },
      inputProps: {
        className: 'text-nowrap',
        type: 'checkbox',
        value: true,
        label: "Visualização do Rebanho",
        id: "visualizar_rebanho",
        name: "visualizar_rebanho",
        defaultChecked: true
      }
    },
    {
      padding: checkboxPadding,
      wrapper: {
        class: 'large-input'
      },
      inputProps: {
        className: 'text-nowrap',
        type: 'checkbox',
        value: true,
        label: "Visualização do Calendário",
        id: "visualizar_calendario",
        name: "visualizar_calendario",
        defaultChecked: true
      }
    },
    {
      padding: checkboxPadding,
      wrapper: {
        class: 'large-input'
      },
      inputProps: {
        className: 'text-nowrap',
        type: 'checkbox',
        value: true,
        label: "Visualização de Usuários e Grupos",
        id: "visualizar_grupos",
        name: "visualizar_grupos",
        defaultChecked: true
      }
    },
    {
      padding: checkboxPadding,
      wrapper: {
        class: 'large-input'
      },
      inputProps: {
        className: 'text-nowrap',
        type: 'checkbox',
        value: true,
        label: "Alteração do Rebanho",
        id: "alterar_rebanho",
        name: "alterar_rebanho"
      }
    },
    {
      padding: checkboxPadding,
      wrapper: {
        class: 'large-input'
      },
      inputProps: {
        className: 'text-nowrap',
        type: 'checkbox',
        value: true,
        label: "Alteração de Eventos do Calendário",
        id: "alterar_calendario",
        name: "alterar_calendario"
      }
    },
    {
      padding: checkboxPadding,
      wrapper: {
        class: 'large-input'
      },
      inputProps: {
        className: 'text-nowrap',
        type: 'checkbox',
        value: true,
        label: "Alteração de Usuários e Grupos",
        id: "alterar_grupos",
        name: "alterar_grupos"
      }
    }
  ];

  return (
    <form onSubmit={onSubmit} className='medium-input'>
      <RenderFields fields={textFields} />
      <FormRow padding="pt-3">
        <Form.Label className='my-label'>Permissões</Form.Label>
      </FormRow>
      <RenderFields fields={checkboxFields} />
      <div className="row pt-5 justify-content-center">
        <Button className="form-btn" variant="primary" type="submit">
          Cadastrar
        </Button>
      </div>
    </form>
  )

}

export default FormCadastroGrupo;