import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/UI/PageTitle';
import CustomTable from '../../components/layout/table/CustomTable';
import TablePagination from '../../components/layout/table/TablePagination';
import FiltroUsuarios from '../../components/layout/forms/usuarios/FiltroUsuarios';
import ErrorParagraph from '../../components/UI/ErrorParagraph';
import editIcon from '/edit_icon.svg';


const ListagemUsuarios = () => {
  const [usersData, setUsersData] = useState([]);
  const [pages, setPages] = useState({ current: 1, max: null });
  const [errorMessage, setErrorMessage] = useState();
  const schema = [
    ['nome', 'Nome'],
    ['email', 'E-Mail'],
    ['grupo_nome', 'Grupo'],
    ['data_cadastro', 'Data de Cadastro'],
    ['editar', 'Editar']
  ];

  const updateData = useCallback((data) => {
    if (data?.isError) {
      setErrorMessage(data.message);
      return;
    }
    const updatedUsersData = data.map(user => ({
      ...user, editar: (
        <Link to={`/usuario/${user.email}/editar`}>
          <img src={editIcon} alt="Ícone de editar usuário" className='edit-icon' />
        </Link>
      )
    }));
    setUsersData(updatedUsersData);
  }, []);

  const updatePages = useCallback((current, max) => setPages({ current, max }), []);

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
                  <CustomTable schema={schema} data={usersData} uniqueCol="email" />
                  <TablePagination pages={pages} updatePages={updatePages} />
                </>
              ) 
              : <ErrorParagraph error={{ message: 'Nenhum usuário cadastrado' }} /> }
            </div>
          </>
        )
      }
    </>
  );
};

export default ListagemUsuarios;
