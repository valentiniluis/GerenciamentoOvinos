import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageTitle from '../../components/UI/PageTitle';
import CustomTable from '../../components/layout/table/CustomTable';
import GanhoPesoDiario from '../../components/UI/GanhoPesoDiario';

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
        const response = await api.get(`/rebanho/${brinco}`);
        const data = response.data;
        setSheepData(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [brinco]);

  return (
    <>
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
      <GanhoPesoDiario data={sheepData} />
    </>
  );
}

export default DadosOvino;
