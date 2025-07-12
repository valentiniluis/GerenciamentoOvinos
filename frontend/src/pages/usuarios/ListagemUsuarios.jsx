import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/UI/PageTitle';
import CustomTable from '../../components/layout/table/CustomTable';
import FiltroUsuarios from '../../components/layout/forms/usuarios/FiltroUsuarios';
import ErrorParagraph from '../../components/UI/ErrorParagraph';
import editIcon from '/edit_icon.svg';


const ListagemUsuarios = () => {
  const [usersData, setUsersData] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const schema = [
    ['nome', 'Nome'],
    ['email', 'E-Mail'],
    ['grupo_nome', 'Grupo'],
    ['data_cadastro', 'Data de Cadastro'],
    ['editar', 'Editar']
  ];

  const updateUsersData = (data) => {
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
  }

  return (
    <>
      <PageTitle title="Listagem de Usuários" />
      {errorMessage ? <ErrorParagraph error={{ message: errorMessage }} />
        : (
          <>
            <section className="form-cont flex-center">
              <FiltroUsuarios updateUsersData={updateUsersData} />
            </section>
            <div className="row py-3">
              {usersData.length > 0 ? (
                <CustomTable schema={schema} data={usersData} uniqueCol="email" />
              ) : (
                <h3 className="text-center">Nenhuma informação cadastrada</h3>
              )}
            </div>
          </>
        )}
    </>
  );
};

export default ListagemUsuarios;
