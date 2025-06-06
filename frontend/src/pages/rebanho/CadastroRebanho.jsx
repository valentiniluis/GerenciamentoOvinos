import '../../styles/form.css';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import PageTitle from '../../components/UI/PageTitle';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import InputField from '../../components/UI/InputField';
import FormRow from '../../components/UI/FormRow';

import api from '../../api/request';

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
            placeholder="Ex. 1N123"
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
            placeholder={comprado === true ? "" : "Ex. 1N100"}
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
            onChange={changeComprado}
            value={true}
            className="text-center"
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
          <Form.Control
            id="raca"
            name="raca"
            type="text"
            required
            placeholder='Ex. Santa Inês'
          />
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
              id='macho'
              type="radio"
              name="sexo"
              value="M"
              label="Macho"
              required
            />
            <Form.Check
              inline
              id='femea'
              type="radio"
              name="sexo"
              value="F"
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
            <option value="venda">Venda</option>
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
            placeholder="Ex. 3,250"
          />
        ),
        label: 'Peso Nascimento (kg)',
        size: 'small-input',
      },
    ]
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const jsonData = Object.fromEntries(formData.entries());
      const result = await api.post('/rebanho', jsonData);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={'Rebanho'} />
      <main className="col cont px-5">
        <PageTitle title="Cadastrar Ovino" />
        <div className="form-cont flex-center">
          <form onSubmit={handleSubmit} className='large-input'>
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
            <div className="row pt-5 mt-2 justify-content-center">
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
