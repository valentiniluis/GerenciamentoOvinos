import { useEffect, useState, useContext } from 'react';
import { useParams, useLoaderData, useFetcher } from 'react-router-dom';
import PageTitle from '../../components/UI/PageTitle.jsx';
import CustomTable from '../../components/layout/table/CustomTable.jsx';
import GanhoPesoDiario from '../../components/UI/GanhoPesoDiario.jsx';
import ErrorParagraph from '../../components/UI/ErrorParagraph.jsx';
import DeleteIcon from '../../components/UI/DeleteIcon.jsx';
import CustomAlert from '../../components/UI/CustomAlert.jsx';
import { PermissionsContext } from '../../store/permissions-context.jsx';
import ErrorPage from '../ErrorPage.jsx';

import { SHEEP_WEIGHT_SCHEMA } from '../../util/tableSchemas.js';
import api from '../../api/request';


const DadosOvino = () => {
  const permissions = useContext(PermissionsContext);
  const fetcher = useFetcher();
  const { brinco } = useParams();
  const [deleteMessage, setDeleteMessage] = useState({ message: null, variant: null });
  const response = useLoaderData();

  useEffect(() => {
    setDeleteMessage({
      variant: fetcher.data?.isError ? 'danger' : 'success',
      message: fetcher.data?.message
    });
  }, [fetcher.data]);

  if (!permissions.perm_visual_rebanho) return <ErrorPage title="Usuário não autorizado" />

  if (response.isError) return <ErrorPage title={response.message} />

  let sheepData = response.data;

  const handleDelete = (dataPesagem) => {
    const dataFormatada = dataPesagem.split('/').join('-');
    fetcher.submit(null, { action: `/rebanho/${brinco}/pesagem/${dataFormatada}`, method: 'DELETE' });
  }

  const handleCloseMessage = () => setDeleteMessage({ variant: null, message: null });

  const schema = [...SHEEP_WEIGHT_SCHEMA];

  if (permissions.perm_alter_rebanho) {
    sheepData = sheepData.map(pesagem => ({
      ...pesagem, excluir: (
        <DeleteIcon
          confirm={() => handleDelete(pesagem.data_pesagem)}
          disabled={pesagem.etapa_vida === 'Nascimento'}
          modalTitle="Confirmar Exclusão da Pesagem"
          modalText="Os dados da pesagem serão excluídos permanentemente. Você tem certeza?"
        />
      )
    }));
    schema.push(['excluir', 'Excluir']);
  }

  return (
    <>
      <PageTitle title={`Dados Ovino Nº ${brinco}`} />
      <section className="row py-4">
        <h2>Pesagens</h2>
        {sheepData.length > 0
          ? <CustomTable schema={schema} data={sheepData} uniqueCol="data_pesagem" />
          : <ErrorParagraph error={{ message: 'Nenhuma pesagem cadastrada' }} />
        }
      </section>
      {sheepData.length >= 2
        ? <GanhoPesoDiario data={sheepData} />
        : <ErrorParagraph error={{ message: 'O ovino não tem o mínimo de 2 pesagens cadastradas para o cálculo do GPD.' }} />
      }
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
  const url = '/rebanho/' + brinco + '/dados';
  try {
    return await api.get(url);
  } catch (err) {
    return {
      isError: true,
      message: err.response?.data?.message || 'Falha ao carregar dados do ovino. Tente novamente mais tarde.'
    };
  }
}