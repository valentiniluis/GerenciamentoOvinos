import { useLoaderData } from 'react-router-dom';
import '../../styles/form.css';
import ReturnLink from '../../components/UI/ReturnLink.jsx';
import PageTitle from '../../components/UI/PageTitle.jsx';
import FormOvino from '../../components/layout/forms/rebanho/FormOvino.jsx';
import ErrorParagraph from '../../components/UI/ErrorParagraph.jsx';

import api from '../../api/request';


const EditarOvino = () => {
  const data = useLoaderData();

  if (data && data.isError) {
    return <ErrorParagraph error={data} />
  }

  const title = (
    <>
      <ReturnLink path="/rebanho/listar" />
      <span className='title-span'>{`Editar Ovino N° ${data.brinco_num}`}</span>
    </>
  );


  return (
    <>
      <PageTitle title={title} />
      <div className="form-cont flex-center">
        <FormOvino dados={data} metodo="PUT" />
      </div>
    </>
  );
};


export default EditarOvino;


export const loader = async ({ params }) => {
  const { brinco } = params;

  try {
    const queryParam = 'brinco_num=' + brinco;
    const response = await api.get('/rebanho?' + queryParam);
    const data = response.data.sheep;
    if (data.length === 0) throw new Error('Ovino não cadastrado');
    return data[0];
  } catch (err) {
    return {
      isError: true,
      defaultMessage: err.message,
      message: 'Falha ao carregar dados do ovino. Tente novamente mais tarde'
    };
  }
}