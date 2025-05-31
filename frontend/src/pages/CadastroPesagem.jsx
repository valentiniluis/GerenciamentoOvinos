import { Button } from "react-bootstrap";

import Sidebar from "../components/layout/sidebar/Sidebar";
import PageTitle from "../components/UI/PageTitle";
import FormRow from "../components/UI/FormRow";
import InputField from "../components/UI/InputField";

const CadastroPesagem = () => {
  const rowPadding = 'py-3';
  const rows = [
    {
      label: 'Nº do Brinco', size: 'medium-input',
      element: <input className="form-input" type="text" id="num_brinco" name="num_brinco" />
    },
    {
      label: 'Etapa da Vida', size: 'medium-input',
      element: <input className="form-input" type="text" id="etapa" name="etapa" placeholder="Ex. Engorda/Abate" />
    },
    {
      label: 'Peso (kg)', size: 'small-input',
      element: <input className="form-input" type="number" id="peso" name="peso" step={0.001} min={0} />
    },
    {
      label: 'Data Pesagem', size: 'small-input',
      element: <input className="form-input" type="date" id="data_pesagem" name="data_pesagem" />
    },
    {
      label: 'Observação', size: 'large-input',
      element: <input className="form-input" type="text" id="observacao" name="observacao" />
    }
  ]

  return (
    <div className="row m-0">
      <Sidebar user="Luís" currentPage='Rebanho' />
      <main className="col cont px-5">
        <PageTitle title="Cadastrar Pesagem de Ovino" />
        <div className="form-cont flex-center">
          <form action="/" method="POST">
            {rows.map((row, i) => (
              <FormRow padding={rowPadding} key={`Form Row ${i + 1}`} >
                <InputField label={row.label} input={row.element} size={row.size} />
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
}


export default CadastroPesagem;