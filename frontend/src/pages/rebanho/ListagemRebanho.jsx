import { useState, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/UI/PageTitle.jsx';
import CustomTable from '../../components/layout/table/CustomTable.jsx';
import ErrorParagraph from '../../components/UI/ErrorParagraph.jsx';
import FiltroOvinos from '../../components/layout/forms/rebanho/FiltroOvinos.jsx';
import TablePagination from '../../components/layout/table/TablePagination.jsx';
import ErrorPage from '../ErrorPage.jsx';
import editIcon from '/edit_icon.svg';
import { PermissionsContext } from '../../store/permissions-context';



const ListagemRebanho = () => {
  const permissions = useContext(PermissionsContext);
  const [animalData, setAnimalData] = useState([]);
  const [pages, setPages] = useState({ current: 1, max: null });
  const [errorMessage, setErrorMessage] = useState();

  const SCHEMA = [
    ['brinco_num', 'Nº do Brinco'],
    ['brinco_mae', 'Nº Brinco Mãe'],
    ['data_nascimento', 'Nascimento'],
    ['raca', 'Raça'],
    ['sexo', 'Sexo'],
    ['finalidade', 'Finalidade'],
    ['abatido', 'Abatido'],
    ['pesagens', 'Pesagens']
  ];

  const updateData = useCallback(data => {
    if (data?.isError) {
      setErrorMessage(data.message);
      return;
    }
    const linkedData = data.map(obj => {
      const updatedData = { ...obj };
      const brinco = updatedData['brinco_num'];
      updatedData['pesagens'] = (
        <Link className="my-link" to={`/rebanho/${brinco}`}>
          Acessar
        </Link>
      );

      if (!permissions.perm_alter_rebanho) return updatedData;

      updatedData['editar'] = (
        <Link className="my-link" to={`/rebanho/${brinco}/editar`}>
          <img src={editIcon} alt="Ícone para Editar Ovino" className='edit-icon' />
        </Link>
      );
      return updatedData;
    });
    setAnimalData(linkedData);
  }, [permissions.perm_alter_rebanho]);

  const updatePages = useCallback((current, max) => setPages({ current, max }), []);

  if (!permissions.perm_visual_rebanho) return <ErrorPage title="Usuário não autorizado" />;
  if (permissions.perm_alter_rebanho) SCHEMA.push(['editar', 'Editar']);

  return (
    <>
      <PageTitle title="Listagem Rebanho" />
      {errorMessage ? <ErrorParagraph error={{ message: errorMessage }} />
        : (
          <>
            <section className="form-cont flex-center">
              <FiltroOvinos updateData={updateData} page={pages.current} updatePages={updatePages} />
            </section>
            <div className="row py-3">
              {animalData.length > 0
                ? (
                  <>
                    <CustomTable schema={SCHEMA} data={animalData} uniqueCol="brinco_num" />
                    <TablePagination pages={pages} updatePages={updatePages} />
                  </>
                )
                : <ErrorParagraph error={{ message: "Nenhum ovino cadastrado" }} />}
            </div>
          </>
        )
      }
    </>
  );
};

export default ListagemRebanho;
