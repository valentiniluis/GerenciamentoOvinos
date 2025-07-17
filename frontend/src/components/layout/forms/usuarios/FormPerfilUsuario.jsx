import '../../../../styles/form.css';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import RenderFields from '../RenderFields';
import FormBtn from '../../../UI/FormBtn';
import ErrorParagraph from '../../../UI/ErrorParagraph';


const FormPerfilUsuario = () => {
  const [readMode, setReadMode] = useState(true);
  const userData = useLoaderData();

  if (userData.isError) return <ErrorParagraph error={{ message: userData.message }} />

  const rowPadding = 'py-2';
  const fields = [
    {
      wrapper: {
        size: 'large-input',
        class: rowPadding,
      },
      inputProps: {
        label: 'Nome',
        size: 'medium-input',
        className: 'my-input',
        id: 'nome',
        type: 'text',
        name: 'nome',
        readOnly: readMode,
        defaultValue: userData.nome,
        required: true,
      },
    },
    {
      wrapper: {
        size: 'large-input',
        class: rowPadding,
      },
      inputProps: {
        label: 'E-Mail',
        className: 'my-input',
        id: 'email',
        type: 'email',
        name: 'email',
        readOnly: readMode,
        defaultValue: userData.email,
        required: true,
      },
    },
    {
      wrapper: {
        size: 'large-input',
        class: rowPadding,
      },
      inputProps: {
        label: 'Grupo',
        className: 'my-input',
        id: 'grupo_nome',
        type: 'text',
        name: 'grupo_nome',
        readOnly: true,
        defaultValue: userData.grupo_nome,
      },
    },
  ];

  const handleEdit = (event) => {
    event.preventDefault();
  };

  const toggleReadMode = () => {
    setReadMode(prevMode => !prevMode);
  };

  const editBtnText = (readMode) ? 'Editar Dados' : 'Salvar Alterações';
  const editBtnType = (readMode) ? 'button' : 'submit';

  return (
    <form onSubmit={handleEdit} className="medium-input">
      <RenderFields fields={fields} />
      <div className="row py-5 justify-content-center">
        <FormBtn
          text={editBtnText}
          onClick={toggleReadMode}
          type={editBtnType}
        />
      </div>
      <div className="row pb-5 justify-content-center">
        <FormBtn text="Alterar Minha Senha" />
      </div>
    </form>
  );
};

export default FormPerfilUsuario;
