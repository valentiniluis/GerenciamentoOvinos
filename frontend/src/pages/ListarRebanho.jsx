import Sidebar from '../components/layout/sidebar/Sidebar';
import InputField from '../components/UI/InputField';
import PageTitle from '../components/UI/PageTitle';
import CustomTable from '../components/layout/table/CustomTable';
import { useEffect, useState } from 'react';


const ListarRebanho = () => {
  const [animalData, setAnimalData] = useState([{"num_brinco": "1002","brinco_mae": "731","data_nasc": "18/12/2023","raca": "Santa Ines","sexo": "M","finalidade": "Reprodução", "mais_detalhes": <a>Acessar</a> }]);
  const schema = { "num_brinco": "Nº do Brinco", "brinco_mae": "Nº Brinco Mãe", "data_nasc": "Data Nascimento", "raca": "Raça", "sexo": "Sexo", "finalidade": "Finalidade", "mais_detalhes": "Mais Detalhes" };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const headers = { "Content-Type": 'application/json', 'mode': 'no-cors' };
  //     const response = await fetch('http://localhost:3000/rebanho', headers);
  //     const data = await response.json();
  //     console.log(data);
  //   }
  //   fetchData();
  // }, []);

  const handleSubmit = () => {

  }

  return (
    <div className="row m-0">
      <Sidebar user='Luís' currentPage='Rebanho' />
      <main className="col cont px-5">
        <PageTitle title="Listagem Rebanho" />
        <form action={handleSubmit}>
          <div className="medium-input">
            <InputField label="Pesquisar por Nº do Brinco" name="brinco_pesquisa" />
          </div>
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