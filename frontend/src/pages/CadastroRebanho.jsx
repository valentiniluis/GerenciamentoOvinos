import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

import '../styles/form.css';

import PageTitle from '../components/UI/PageTitle';
import Sidebar from '../components/layout/sidebar/Sidebar';
import InputField from '../components/UI/InputField';
import FormRow from '../components/UI/FormRow';

const CadastroRebanho = () => {
  const [comprado, setComprado] = useState(false);

  const changeComprado = (event) => {
    // se o checkbox estiver marcardo, o state 'comprado' será = true.
    // com isso, faz-se um reset no valor do input 'Brinco Mãe'
    setComprado(event.target.checked);
    if (comprado === false) document.getElementById('brinco_mae').value = '';
  };

  const rowPadding = 'py-2';
  const rows = [
    [
      {
        element: (
          <Form.Control
            id="num_brinco"
            type="text"
            name="num_brinco"
            required
            placeholder="Digite o número do brinco"
          />
        ),
        label: 'Nº do Brinco',
        size: 'medium-input',
      },
    ],
    [
      {
        element: (
          <Form.Control
            id="brinco_mae"
            type="text"
            name="brinco_mae"
            disabled={comprado === true}
            required={!comprado}
            placeholder="Digite o brinco da mãe"
          />
        ),
        label: 'Nº Brinco Mãe',
        size: 'medium-input',
      },
      {
        element: (
          <Form.Check
            id="comprado"
            type="checkbox"
            name="comprado"
            label=""
            onChange={changeComprado}
            value={true}
            className="text-center"
            style={{}}
          />
        ),
        label: 'Ovino Comprado',
        size: 'small-input',
        labelClass: 'w-100 text-center',
      },
    ],
    [
      {
        element: (
          <Form.Select
            id="raca"
            name="raca"
            required
            onInvalid={(e) =>
              e.target.setCustomValidity('Selecione uma raça válida')
            }
            onInput={(e) => e.target.setCustomValidity('')}
          >
            <option value="" disabled hidden>
              Selecione a raça
            </option>
            <option value="dorper">Dorper</option>
            <option value="santa_ines">Santa Inês</option>
            <option value="suffolk">Suffolk</option>
            <option value="outra">Outra</option>
          </Form.Select>
        ),
        label: 'Raça',
        size: 'medium-input',
      },
    ],
    [
      {
        element: (
          <div className="d-flex gap-3">
            <Form.Check
              inline
              type="radio"
              name="sexo"
              value="macho"
              label="Macho"
              required
            />
            <Form.Check
              inline
              type="radio"
              name="sexo"
              value="femea"
              label="Fêmea"
            />
          </div>
        ),
        label: 'Sexo',
        size: 'small-input',
      },
      {
        element: (
          <Form.Control id="data_nasc" type="date" name="data_nasc" required />
        ),
        label: 'Data de Nascimento',
        size: 'small-input',
      },
    ],
    [
      {
        element: (
          <Form.Select
            id="finalidade"
            name="finalidade"
            required
            onInvalid={(e) =>
              e.target.setCustomValidity('Selecione uma finalidade válida')
            }
            onInput={(e) => e.target.setCustomValidity('')}
          >
            <option value="" disabled hidden>
              Selecione a finalidade
            </option>
            <option value="abate">Abate</option>
            <option value="reproducao">Reprodução</option>
            <option value="leite">Leite</option>
            <option value="outro">Outros</option>
          </Form.Select>
        ),
        label: 'Finalidade',
        size: 'small-input',
      },
      {
        element: (
          <Form.Control
            id="peso_nasc"
            type="number"
            name="peso_nasc"
            min={0}
            step={0.001}
            required
            placeholder="Peso em kg"
          />
        ),
        label: 'Peso Nascimento',
        size: 'small-input',
      },
    ],
    [
      {
        element: (
          <Form.Control
            id="observacao"
            type="text"
            name="observacao"
            placeholder="Observações adicionais"
          />
        ),
        label: 'Observação',
        size: 'large-input',
      },
    ],
  ];

  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={'Rebanho'} />
      <main className="col cont px-5">
        <PageTitle title="Cadastrar Ovino" />
        <div className="form-cont flex-center">
          <form action="/ovino" method="POST">
            <h4 className="py-1">Informações</h4>
            {rows.map((row, i) => (
              <FormRow padding={rowPadding} key={`Form Row ${i + 1}`}>
                {row.map((field, j) => (
                  <InputField
                    input={field.element}
                    label={field.label}
                    size={field.size}
                    labelClass={field.labelClass}
                    key={`Row ${i + 1} Element ${j + 1}`}
                  />
                ))}
              </FormRow>
            ))}
            <div className="row pt-5 justify-content-center">
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

export default CadastroRebanho;
