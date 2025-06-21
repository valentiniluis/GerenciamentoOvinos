import '../../../../styles/form.css';
import { useState } from 'react';
import RenderFields from '../RenderFields';
import { Form } from 'react-bootstrap';
import FormRow from '../../../UI/FormRow';
import FormBtn from '../../../UI/FormBtn';
import ApiAlert from '../../../UI/ApiAlert';

import api from '../../../../api/request';


const TEXT_PADDING = 'py-2';
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
      required: true
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
      placeholder: "Descrição Opcional"
    }
  }
];


const CHECKBOX_PADDING = 'py-1';
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
      defaultChecked: true
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
      defaultChecked: true
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
      defaultChecked: true
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
      name: "alterar_rebanho"
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
      name: "alterar_calendario"
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
      setSuccessMsg(result.data.message);
      event.target.reset();
    } catch (err) {
      console.log(err)
      setErrorMsg(err.response.data.message || 'Erro inesperado. Tente novamente mais tarde');
    }
  }

  return (
    <form onSubmit={handleSubmit} className='medium-input sla'>
      <RenderFields fields={TEXT_FIELDS} />
      <FormRow padding="pt-3">
        <Form.Label className='my-label'>Permissões</Form.Label>
      </FormRow>
      <RenderFields fields={CHECKBOX_FIELDS} />
      <div className="row py-5 justify-content-center">
        <FormBtn text="Cadastrar" type="submit"/>
      </div>
      <ApiAlert variant="danger" message={errorMsg} onClose={() => setErrorMsg(null)} />
      <ApiAlert variant="success" message={successMsg} onClose={() => setSuccessMsg(null)} />
    </form>
  );
}

export default FormCadastroGrupo;