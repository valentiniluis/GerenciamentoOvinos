import { useParams, useLoaderData } from 'react-router-dom';
import PageTitle from '../../components/UI/PageTitle.jsx';
import CustomTable from '../../components/layout/table/CustomTable.jsx';
import GanhoPesoDiario from '../../components/UI/GanhoPesoDiario.jsx';
import ErrorParagraph from '../../components/UI/ErrorParagraph.jsx';

import api from '../../api/request';


const SCHEMA = [
  ['ovino_brinco', 'Nº do Brinco'],
  ['etapa_vida', 'Etapa da Vida'],
  ['peso', 'Peso (kg)'],
  ['data_pesagem', 'Data da Pesagem'],
  ['observacao', 'Observação']
];


const DadosOvino = () => {
  const { brinco } = useParams();

  const response = useLoaderData();
  if (response.isError) return <ErrorParagraph error={response} />

  const sheepData = response.data;

  return (
    <>
      <PageTitle title={`Dados Ovino Nº ${brinco}`} />
      <section className="row py-4">
        <h2>Pesagens</h2>
        {sheepData.length > 0
          ? <CustomTable schema={SCHEMA} data={sheepData} uniqueCol="data_pesagem" />
          : <ErrorParagraph error={{ message: 'Nenhuma pesagem cadastrada' }} />
        }
      </section>
      <section className="limit-600">
        <h2>Ganho de Peso Diário</h2>
        {sheepData.length > 2
          ? <GanhoPesoDiario data={sheepData} />
          : <ErrorParagraph error={{ message: 'O ovino não tem o mínimo de 2 pesagens cadastradas para o cálculo do GPD.' }} />
        }
      </section>
    </>
  );
}

export default DadosOvino;


export const loader = async ({ params }) => {
  const { brinco } = params;
  const url = '/rebanho/' + brinco;
  try {
    return await api.get(url);
  } catch (err) {
    return {
      isError: true,
      defaultMessage: err.message,
      message: 'Falha ao carregar dados do ovino. Tente novamente mais tarde.'
    };
  }
}