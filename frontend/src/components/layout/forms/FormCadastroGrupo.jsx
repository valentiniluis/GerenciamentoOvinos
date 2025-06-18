import '../../../styles/form.css';
import { useState } from 'react';
import RenderFields from './RenderFields';
import { Form, Button } from 'react-bootstrap';
import FormRow from '../../UI/FormRow';
import ApiAlert from '../../UI/ApiAlert';

import api from '../../../api/request';


const TEXT_PADDING = 'py-3';
const TEXT_FIELDS = [
  {
    padding: TEXT_PADDING,
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
    padding: TEXT_PADDING,
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


const CHECKBOX_PADDING = 'py-1';
const CHECKBOX_FIELDS = [
  {
    padding: CHECKBOX_PADDING,
    wrapper: {
      class: 'large-input d-flex gap-3'
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
    padding: CHECKBOX_PADDING,
    wrapper: {
      class: 'large-input d-flex gap-3'
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
    padding: CHECKBOX_PADDING,
    wrapper: {
      class: 'large-input d-flex gap-3'
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
    padding: CHECKBOX_PADDING,
    wrapper: {
      class: 'large-input d-flex gap-3'
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
    padding: CHECKBOX_PADDING,
    wrapper: {
      class: 'large-input d-flex gap-3'
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
    padding: CHECKBOX_PADDING,
    wrapper: {
      class: 'large-input d-flex gap-3'
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
    padding: CHECKBOX_PADDING,
    wrapper: {
      class: 'large-input d-flex gap-3'
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


const FormCadastroGrupo = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const formData = new FormData(event.target);
      const allEntries = formData.entries();
      const permissions = {};
      const otherData = {};
      allEntries.forEach(([key, value]) => {
        if (key.startsWith('visualizar') || key.startsWith('alterar')) {
          permissions[key] = value;
        }
        else otherData[key] = value;
      });

      const now = new Date().toISOString().split('T')[0];
      const postData = { ...otherData, data_criacao: now, permissoes: { ...permissions } };
      console.log(postData);
      const result = await api.post('/grupos', postData);
      console.log(result);

      setSuccessMsg('Grupo cadastrado com sucesso');

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
    <form onSubmit={handleSubmit} className='medium-input'>
      <RenderFields fields={TEXT_FIELDS} />
      <FormRow padding="pt-3">
        <Form.Label className='my-label'>Permissões</Form.Label>
      </FormRow>
      <RenderFields fields={CHECKBOX_FIELDS} />
      <div className="row pt-5 justify-content-center">
        <Button className="form-btn" variant="primary" type="submit">
          Cadastrar
        </Button>
      </div>
      <ApiAlert variant="danger" message={errorMsg} onClose={() => setErrorMsg(null)} />
      <ApiAlert variant="success" message={successMsg} onClose={() => setSuccessMsg(null)} />
    </form>
  );
}

export default FormCadastroGrupo;