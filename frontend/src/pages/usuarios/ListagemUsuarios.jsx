import { useState, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/UI/PageTitle';
import CustomTable from '../../components/layout/table/CustomTable';
import TablePagination from '../../components/layout/table/TablePagination';
import FiltroUsuarios from '../../components/layout/forms/usuarios/FiltroUsuarios';
import ErrorParagraph from '../../components/UI/ErrorParagraph';
import ErrorPage from '../ErrorPage';
import { PermissionsContext } from '../../store/permissions-context';
import editIcon from '/edit_icon.svg';


const ListagemUsuarios = () => {
  const permissions = useContext(PermissionsContext);
  const [usersData, setUsersData] = useState([]);
  const [pages, setPages] = useState({ current: 1, max: null });
  const [errorMessage, setErrorMessage] = useState();

  const updateData = useCallback(data => {
    if (data?.isError) return setErrorMessage(data.message);
    let newData = [...data];
    if (permissions.perm_alter_usuario_grupo) {
      newData = newData.map(user => ({
        ...user, editar: (
          <Link to={`/usuario/${user.email}/editar`}>
            <img src={editIcon} alt="Ícone de editar usuário" className='edit-icon' />
          </Link>
        )
      }));
    }
    setUsersData(newData);
  }, [permissions.perm_alter_usuario_grupo]);

  const updatePages = useCallback((current, max) => setPages({ current, max }), []);

  if (!permissions.perm_visual_grupos) return <ErrorPage title="Usuário não autorizado" />

  const SCHEMA = [
    ['nome', 'Nome'],
    ['email', 'E-Mail'],
    ['grupo_nome', 'Grupo'],
    ['data_cadastro', 'Data de Cadastro'],
  ];

  if (permissions.perm_alter_usuario_grupo) SCHEMA.push(['editar', 'Editar']);

  return (
    <>
      <PageTitle title="Listagem de Usuários" />
      {errorMessage ? <ErrorParagraph error={{ message: errorMessage }} />
        : (
          <>
            <section className="form-cont flex-center">
              <FiltroUsuarios updateData={updateData} page={pages.current} updatePages={updatePages} />
            </section>
            <div className="row py-3">
              {usersData.length > 0 ? (
                <>
                  <CustomTable schema={SCHEMA} data={usersData} uniqueCol="email" />
                  <TablePagination pages={pages} updatePages={updatePages} />
                </>
              )
                : <ErrorParagraph error={{ message: 'Nenhum usuário cadastrado' }} />}
            </div>
          </>
        )
      }
    </>
  );
};

export default ListagemUsuarios;
