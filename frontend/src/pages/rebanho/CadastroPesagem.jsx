import { Button, Form } from 'react-bootstrap';

import Sidebar from '../../components/layout/sidebar/Sidebar';
import PageTitle from '../../components/UI/PageTitle';
import FormRow from '../../components/UI/FormRow';
import InputField from '../../components/UI/InputField';

const CadastroPesagem = () => {
  const rowPadding = 'py-3';
  const rows = [
    {
      label: 'Nº do Brinco',
      size: 'medium-input',
      element: (
        <Form.Control
          type="text"
          id="num_brinco"
          name="num_brinco"
          required
          placeholder="Ex. 1N123"
        />
      ),
    },
    {
      label: 'Etapa da Vida',
      size: 'medium-input',
      element: (
        <Form.Select
          id="etapa"
          name="etapa"
          required
          onInvalid={(e) =>
            e.target.setCustomValidity('Escolha uma etapa válida')
          }
          onInput={(e) => e.target.setCustomValidity('')}
        >
          <option value="" hidden>Selecione a etapa</option>
          <option value="criacao">Desmame</option>
          <option value="engorda">Engorda</option>
          <option value="abate">Abate</option>
          <option value="reproducao">Reprodução</option>
        </Form.Select>
      ),
    },
    {
      label: 'Peso (kg)',
      size: 'small-input',
      element: (
        <Form.Control
          type="number"
          id="peso"
          name="peso"
          step={0.001}
          min={0}
          required
          placeholder="Ex. 3,500"
        />
      ),
    },
    {
      label: 'Data Pesagem',
      size: 'small-input',
      element: (
        <Form.Control
          type="date"
          id="data_pesagem"
          name="data_pesagem"
          required
        />
      ),
    },
    {
      label: 'Observação',
      size: 'large-input',
      element: (
        <Form.Control
          type="text"
          id="observacao"
          name="observacao"
          placeholder="Observações adicionais"
        />
      ),
    },
  ];

  return (
    <div className="row m-0">
      <Sidebar user="Luís" currentPage="Rebanho" />
      <main className="col cont px-5">
        <PageTitle title="Cadastrar Pesagem de Ovino" />
        <div className="form-cont flex-center">
          <form action="/" method="POST">
            {rows.map((row, i) => (
              <FormRow padding={rowPadding} key={`Form Row ${i + 1}`}>
                <InputField
                  label={row.label}
                  input={row.element}
                  size={row.size}
                />
              </FormRow>
            ))}
            <div className="row py-5 justify-content-center">
              <Button className="form-btn" variant="primary" type="submit">
                Cadastrar
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CadastroPesagem;
