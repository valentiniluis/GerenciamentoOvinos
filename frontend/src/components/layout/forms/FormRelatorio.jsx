import '../../../styles/form.css';
import RenderFields from './RenderFields';
import { Button } from 'react-bootstrap';

const FormRelatorio = ({ onSubmit }) => {
  const rowPadding = 'py-2';
  const fields = [
    {
      padding: rowPadding,
      wrapper: {
        class: 'small-input'
      },
      inputProps: {
        label: 'Data de Início',
        id: 'inicio',
        name: 'inicio',
        type: 'date'
      }
    },
    {
      padding: rowPadding,
      wrapper: {
        class: 'small-input'
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
      <div className="row pt-5 justify-content-center">
        <Button className="form-btn" variant="primary" type="submit">
          Gerar Relatório
        </Button>
      </div>
    </form>
  );
}

export default FormRelatorio;