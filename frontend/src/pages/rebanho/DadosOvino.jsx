import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import PageTitle from '../../components/UI/PageTitle';
import CustomTable from '../../components/layout/table/CustomTable';

import api from '../../api/request';

const DadosOvino = () => {
  const { brinco } = useParams();
  const [sheepData, setSheepData] = useState([]);

  const schema = [
    ['brinco_ovino', 'Nº do Brinco'],
    ['etapa_vida', 'Etapa da Vida'],
    ['peso', 'Peso (kg)'],
    ['data_pesagem', 'Data da Pesagem'],
    ['observacao', 'Observação']
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/rebanho/1N125`);
        const data = response.data;
        setSheepData(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const pageInputs = [
    {
      label: 'Etapa Inicial',
      element: (
        <Form.Select id='inicio' name='inicio'>
          <option hidden>Selecione uma etapa</option>
          {sheepData.map(pesagem => (
            <option key={pesagem.data_pesagem} value={pesagem.data_pesagem}>{pesagem.etapa_vida} - {pesagem.data_pesagem}</option>
          ))}
        </Form.Select>
      )
    },
    {
      label: 'Etapa Final',
      element: (
        <Form.Select id='fim' name='fim'>
          <option hidden>Selecione uma etapa</option>
          {sheepData.map(pesagem => (
            <option key={pesagem.data_pesagem} value={pesagem.data_pesagem}>{pesagem.etapa_vida} - {pesagem.data_pesagem}</option>
          ))}
        </Form.Select>
      )
    }
  ];

  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={'Rebanho'} />
      <main className="col cont px-5">
        <PageTitle title={`Dados Ovino Nº ${brinco}`} />
        <div className="limit-600">
          <h2>Ganho de Peso Diário</h2>
          <p>Selecione a data inicial e data final para obter o valor do GPD do Ovino durante o período especificado.</p>
          {pageInputs.map(field => (
            <Form.Group key={field.label} className='py-3'>
              <Form.Label>{field.label}</Form.Label>
              {field.element}
            </Form.Group>
          ))}
        </div>
        <div className="row py-4">
          <h2>Pesagens</h2>
          {sheepData.length > 0 ? (
            <CustomTable
              schema={schema}
              data={sheepData}
              uniqueCol={'data_pesagem'}
            />
          ) : (
            <h3 className="text-center">Nenhuma informação cadastrada</h3>
          )}
        </div>
      </main>
    </div>
  );
}

export default DadosOvino;
