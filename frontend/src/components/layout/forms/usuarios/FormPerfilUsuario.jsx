import '../../../../styles/form.css';
import { useRef, useState } from 'react';
import { useLoaderData, Link, useSubmit, Form } from 'react-router-dom';
import RenderFields from '../RenderFields.jsx';
import FormBtn from '../../../UI/FormBtn.jsx';
import ErrorParagraph from '../../../UI/ErrorParagraph.jsx';
import ApiAlert from '../../../UI/ApiAlert.jsx';
import Confirmation from '../../modal/Confirmation.jsx';


const FormPerfilUsuario = () => {
  const [readMode, setReadMode] = useState(true);
  const formRef = useRef();
  const submit = useSubmit();
  const userData = useLoaderData();

  if (userData.isError) return <ErrorParagraph error={{ message: userData.message }} />

  const rowPadding = 'py-2';
  let fields = [
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

  const toggleReadMode = () => setReadMode(prevMode => !prevMode);

  let btn = <FormBtn text="Editar Dados" onClick={toggleReadMode} type="button" />;

  if (!readMode) {
    const handleConfirm = () => {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());
      submit(data, { method: 'PUT' });
    }

    const handleCancel = () => {
      formRef.current.reset();
      setReadMode(true);
    }

    btn = (
      <div className='d-flex justify-content-center gap-5'>
        <Confirmation
          title="Tem certeza?"
          text="Ao editar seus dados, você terá que se autenticar novamente."
          btnText="Confirmar"
          className='form-btn'
          onClick={handleConfirm}
        >
          Salvar
        </Confirmation>
        <FormBtn variant='danger' onClick={handleCancel} text="Cancelar" className="delete-btn" />
      </div>
    );
  }

  return (
    <form className="medium-input" ref={formRef}>
      <RenderFields fields={fields} />
      <div className="row py-5 justify-content-center">
        {btn}
      </div>
      <div className="row justify-content-center">
        <Link className='no-decoration text-center my-link'>
          Alterar Minha Senha
        </Link>
      </div>
      <div className="py-4">
        <ApiAlert />
      </div>
    </form>
  );
};

export default FormPerfilUsuario;
