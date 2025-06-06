import { Link } from 'react-router-dom';

import Sidebar from '../../components/layout/sidebar/Sidebar';
import FormRow from '../../components/UI/FormRow';
import InputField from '../../components/UI/InputField';
import PageTitle from '../../components/UI/PageTitle';
import CustomTable from '../../components/layout/table/CustomTable';
import { useEffect, useState } from 'react';

import api from '../../api/request';

// ADICIONAR A FUNCIONALIDADE DOS FILTROS

const ListagemRebanho = () => {
  const [animalData, setAnimalData] = useState([]);
  const schema = [
    ['num_brinco', 'Nº do Brinco'],
    ['brinco_mae', 'Nº Brinco Mãe'],
    ['data_nasc', 'Data Nascimento'],
    ['raca', 'Raça'],
    ['sexo', 'Sexo'],
    ['finalidade', 'Finalidade'],
    ['abatido', 'Abatido'],
    ['mais_detalhes', 'Mais Detalhes'],
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/rebanho');
        const data = response.data;
        console.log(data);
        const linkedData = data.map((obj) => {
          obj['mais_detalhes'] = (
            <Link className="my-link" to={`/rebanho/${obj['num_brinco']}`}>
              Acessar
            </Link>
          );
          return obj;
        });
        setAnimalData(linkedData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = () => {};

  return (
    <div className="row m-0">
      <Sidebar user="Luís" currentPage="Rebanho" />
      <main className="col cont px-5">
        <PageTitle title="Listagem Rebanho" />
        <form action={handleSubmit}></form>
        <div className="row py-3">
          {animalData.length > 0 ? (
            <CustomTable
              schema={schema}
              data={animalData}
              uniqueCol={'num_brinco'}
            />
          ) : (
            <h3 className="text-center">Nenhuma informação cadastrada</h3>
          )}
        </div>
      </main>
    </div>
  );
};

export default ListagemRebanho;
