import { useState } from 'react';
import PageTitle from '../../components/UI/PageTitle';
import CustomTable from '../../components/layout/table/CustomTable';
import FiltroUsuarios from '../../components/layout/forms/usuarios/FiltroUsuarios';


const ListagemUsuarios = () => {
  const [usersData, setUsersData] = useState([]);
  const schema = [
    ['nome', 'Nome'],
    ['email', 'E-Mail'],
    ['grupo_nome', 'Grupo'],
    ['data_cadastro', 'Data de Cadastro'],
  ];

  return (
    <>
      <PageTitle title="Listagem de Usuários" />
      <section className="form-cont flex-center">
        <FiltroUsuarios updateUsersData={setUsersData} />
      </section>
      <div className="row py-3">
        {usersData.length > 0 ? (
          <CustomTable schema={schema} data={usersData} uniqueCol="email" />
        ) : (
          <h3 className="text-center">Nenhuma informação cadastrada</h3>
        )}
      </div>
    </>
  );
};

export default ListagemUsuarios;
