import { Link } from 'react-router-dom';

import Sidebar from '../components/layout/sidebar/Sidebar';
import InputField from '../components/UI/InputField';
import PageTitle from '../components/UI/PageTitle';
import CustomTable from '../components/layout/table/CustomTable';
import { useEffect, useState } from 'react';


const ListarRebanho = () => {
  const [animalData, setAnimalData] = useState([]);
  const schema = {
    "num_brinco": "Nº do Brinco",
    "brinco_mae": "Nº Brinco Mãe",
    "data_nasc": "Data Nascimento",
    "raca": "Raça", "sexo": "Sexo",
    "finalidade": "Finalidade",
    "mais_detalhes": "Mais Detalhes"
  };

  useEffect(() => {
    const fetchData = async () => {
      const headers = { "Content-Type": 'application/json' };
      try {
        const response = await fetch('http://localhost:3000/rebanho', headers);
        if (!response.ok) throw new Error(`Could not fetch the data. Response status: ${response.status}`);

        const data = await response.json();
        const linkedData = data.map(obj => {
          obj['mais_detalhes'] = <Link className='my-link' to={`/rebanho/${obj['num_brinco']}`}>Acessar</Link>
          return obj;
        });
        setAnimalData(linkedData);

      } catch (err) {
        console.log(err);
      }

    }
    fetchData();
  }, []);

  const handleSubmit = () => {

  }

  return (
    <div className="row m-0">
      <Sidebar user='Luís' currentPage='Rebanho' />
      <main className="col cont px-5 sla">
        <PageTitle title="Listagem Rebanho" />
        <form action={handleSubmit}>
        </form>
        {(animalData.length > 0)
         ? <CustomTable schema={schema} data={animalData} uniqueCol={'num_brinco'} />
         : <h3>Nenhuma informação cadastrada</h3>
        }
      </main>
    </div>
  );
}

export default ListarRebanho;