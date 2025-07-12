import { useEffect, useState } from 'react';
import { useParams, useLoaderData, useFetcher } from 'react-router-dom';
import PageTitle from '../../components/UI/PageTitle.jsx';
import CustomTable from '../../components/layout/table/CustomTable.jsx';
import GanhoPesoDiario from '../../components/UI/GanhoPesoDiario.jsx';
import ErrorParagraph from '../../components/UI/ErrorParagraph.jsx';
import DeleteIcon from '../../components/UI/DeleteIcon.jsx';
import CustomAlert from '../../components/UI/CustomAlert.jsx';

import api from '../../api/request';


const SCHEMA = [
  ['ovino_brinco', 'Nº do Brinco'],
  ['etapa_vida', 'Etapa da Vida'],
  ['peso', 'Peso (kg)'],
  ['data_pesagem', 'Data da Pesagem'],
  ['observacao', 'Observação'],
  ['excluir', 'Excluir']
];


const DadosOvino = () => {
  const fetcher = useFetcher();
  const { brinco } = useParams();
  const [deleteMessage, setDeleteMessage] = useState({ message: null, variant: null });

  useEffect(() => {
    setDeleteMessage({
      variant: fetcher.data?.isError ? 'danger' : 'success',
      message: fetcher.data?.message
    });
  }, [fetcher.data]);

  const response = useLoaderData();
  if (response.isError) return <ErrorParagraph error={response} />
  const data = response.data;

  const handleDelete = (dataPesagem) => {
    const dataFormatada = dataPesagem.split('/').join('-');
    fetcher.submit(null, { action: `/rebanho/${brinco}/pesagem/${dataFormatada}`, method: 'DELETE' });
  }

  const handleCloseMessage = () => setDeleteMessage({ variant: null, message: null });

  const sheepData = data.map(pesagem => ({
    ...pesagem, excluir: (
      <DeleteIcon
        confirm={() => handleDelete(pesagem.data_pesagem)}
        disabled={pesagem.etapa_vida === 'Nascimento'}
        modalTitle="Confirmar Exclusão da Pesagem"
        modalText="Os dados da pesagem serão excluídos permanentemente. Você tem certeza?"
      />
    )
  }));

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
        {sheepData.length >= 2
          ? <GanhoPesoDiario data={sheepData} />
          : <ErrorParagraph error={{ message: 'O ovino não tem o mínimo de 2 pesagens cadastradas para o cálculo do GPD.' }} />
        }
      </section>
      <CustomAlert
        variant={deleteMessage.variant}
        message={deleteMessage.message}
        onClose={handleCloseMessage}
      />
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