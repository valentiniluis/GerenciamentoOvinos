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
  const [weightData, setWeightData] = useState({});

  const schema = [
    ['brinco_ovino', 'Nº do Brinco'],
    ['etapa_vida', 'Etapa da Vida'],
    ['peso', 'Peso (kg)'],
    ['data_pesagem', 'Data da Pesagem'],
    ['observacao', 'Observação']
  ];

  const changeWeightData = (event) => {
    const data = sheepData.find(obj => obj.data_pesagem == event.target.value);
    if (event.target.name === 'inicio') setWeightData(prev => ({ ...prev, 'startData': data }));
    else setWeightData(prev => ({ ...prev, 'endData': data }));
  }

  const pageInputs = [
    {
      label: 'Etapa Inicial',
      element: (
        <Form.Select id='inicio' name='inicio' onChange={changeWeightData}>
          <option value="" hidden>Selecione uma etapa</option>
          {sheepData.map(pesagem => (
            <option key={pesagem.data_pesagem} value={pesagem.data_pesagem}>
              {pesagem.etapa_vida} - {pesagem.data_pesagem}
            </option>
          ))}
        </Form.Select>
      )
    },
    {
      label: 'Etapa Final',
      element: (
        <Form.Select id='fim' name='fim' onChange={changeWeightData}>
          <option value="" hidden>Selecione uma etapa</option>
          {sheepData.map(pesagem => (
            <option key={pesagem.data_pesagem} value={pesagem.data_pesagem}>{pesagem.etapa_vida} - {pesagem.data_pesagem}</option>
          ))}
        </Form.Select>
      )
    }
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

  const calculate = () => {
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const { startData, endData } = weightData;

    const [startDay, startMonth, startYear] = startData.data_pesagem.split('/');
    const startTime = new Date(startYear, startMonth - 1, startDay);
    const [endDay, endMonth, endYear] = endData.data_pesagem.split('/');
    const endTime = new Date(endYear, endMonth - 1, endDay);
    if (startTime.getTime() === endTime.getTime()) {
      return { erro: 'Selecione datas diferentes para etapa inicial e etapa final.' };
    }
    else if (startTime > endTime) {
      return { erro: 'A data da etapa final deve após a data da etapa inicial.' };
    }

    const daysPassed = Math.round((endTime - startTime) / MILLISECONDS_PER_DAY);
    const startWeight = parseFloat(weightData.startData.peso);
    const endWeight = parseFloat(weightData.endData.peso);
    const gpd = (endWeight - startWeight) / daysPassed;
    return {
      'pesoInicial': startWeight,
      'pesoFinal': endWeight,
      'diasPassados': daysPassed,
      'GPD': gpd.toFixed(3)
    };
  }
  const result = weightData.startData !== undefined &&
                 weightData.endData !== undefined
                 ? calculate() : undefined;

  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={'Rebanho'} />
      <main className="col cont px-5">
        <PageTitle title={`Dados Ovino Nº ${brinco}`} />
        <section className="row py-4">
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
        </section>
        <section className="limit-600">
          <h2>Ganho de Peso Diário</h2>
          <p className='my-paragraph'>Selecione a data inicial e data final para obter o valor do GPD do Ovino durante o período especificado.</p>
          {pageInputs.map(field => (
            <Form.Group key={field.label} className='py-3'>
              <Form.Label>{field.label}</Form.Label>
              {field.element}
            </Form.Group>
          ))}
          {result === undefined ? '' : result.erro === undefined ? (
            <>
              <p className='my-paragraph'>Dias passados: {result.diasPassados}</p>
              <p className='my-paragraph'>Peso inicial: {result.pesoInicial}kg</p>
              <p className='my-paragraph'>Peso final: {result.pesoFinal}kg</p>
              <p className='my-paragraph'>Ganho de Peso por Dia: {result.GPD}kg</p>
            </>
          ) : (
            <p className='my-paragraph'>{result.erro}</p>
          )}
        </section>

      </main>
    </div>
  );
}

export default DadosOvino;
