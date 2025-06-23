import { Link } from 'react-router-dom';
import PageTitle from '../../components/UI/PageTitle';
import CustomTable from '../../components/layout/table/CustomTable';
import { useEffect, useState } from 'react';

import api from '../../api/request';

// ADICIONAR A FUNCIONALIDADE DOS FILTROS

const ListagemRebanho = () => {
  const [animalData, setAnimalData] = useState([]);
  const schema = [
    ['brinco_num', 'Nº do Brinco'],
    ['brinco_mae', 'Nº Brinco Mãe'],
    ['data_nascimento', 'Data Nascimento'],
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
        const linkedData = data.map((obj) => {
          obj['mais_detalhes'] = (
            <Link className="my-link" to={`/rebanho/${obj['brinco_num']}`}>
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

  const handleSubmit = () => { };

  return (
    <>
      <PageTitle title="Listagem Rebanho" />
      <form action={handleSubmit}>
        <div className="row py-3">
          {animalData.length > 0 ? (
            <CustomTable
              schema={schema}
              data={animalData}
              uniqueCol={'brinco_num'}
            />
          ) : (
            <h3 className="text-center">Nenhuma informação cadastrada</h3>
          )}
        </div>
      </form>
    </>
  );
};

export default ListagemRebanho;
