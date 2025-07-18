import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import '../../styles/form.css';
import ReturnLink from '../../components/UI/ReturnLink.jsx';
import PageTitle from '../../components/UI/PageTitle.jsx';
import FormOvino from '../../components/layout/forms/rebanho/FormOvino.jsx';
import ErrorParagraph from '../../components/UI/ErrorParagraph.jsx';
import ErrorPage from '../ErrorPage.jsx';
import { PermissionsContext } from '../../store/permissions-context.jsx';

import api from '../../api/request';


const EditarOvino = () => {
  const permissions = useContext(PermissionsContext);
  const data = useLoaderData();

  if (!permissions.perm_alter_rebanho) return <ErrorPage title="Usuário não autorizado" />
  if (data && data.isError) return <ErrorParagraph error={data} />

  const pageTitle = 'Editar Ovino N° ' + data.brinco_num;
  const title = (
    <>
      <ReturnLink path="/rebanho/listar" />
      <span className='title-span'>{pageTitle}</span>
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