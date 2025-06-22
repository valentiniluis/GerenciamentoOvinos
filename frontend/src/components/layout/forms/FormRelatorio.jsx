import '../../../styles/form.css';
import RenderFields from './RenderFields';
import FormBtn from '../../UI/FormBtn';

const FormRelatorio = ({ onSubmit }) => {
  const rowPadding = 'py-2';
  const fields = [
    {
      wrapper: {
        class: rowPadding,
        size: 'small-input'
      },
      inputProps: {
        label: 'Data de Início',
        id: 'inicio',
        name: 'inicio',
        type: 'date'
      }
    },
    {
      wrapper: {
        class: rowPadding,
        size: 'small-input'
      },
      inputProps: {
        label: 'Data Final',
        id: 'fim',
        name: 'fim',
        type: 'date'
      }
    }
  ];

  return (
    <form onSubmit={onSubmit}>
      <RenderFields fields={fields} />
      <div className="row py-5 justify-content-center">
        <FormBtn text="Gerar Relatório" />
      </div>
    </form>
  );
}

export default FormRelatorio;