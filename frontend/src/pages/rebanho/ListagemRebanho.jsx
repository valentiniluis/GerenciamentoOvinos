import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/UI/PageTitle';
import CustomTable from '../../components/layout/table/CustomTable';
import ErrorParagraph from '../../components/UI/ErrorParagraph';
import FiltroOvinos from '../../components/layout/forms/rebanho/FiltroOvinos';
import editIcon from '/edit_icon.svg';

// import api from '../../api/request';

const SCHEMA = [
  ['brinco_num', 'Nº do Brinco'],
  ['brinco_mae', 'Nº Brinco Mãe'],
  ['data_nascimento', 'Nascimento'],
  ['raca', 'Raça'],
  ['sexo', 'Sexo'],
  ['finalidade', 'Finalidade'],
  ['abatido', 'Abatido'],
  ['pesagens', 'Pesagens'],
  ['editar', 'Editar']
];


const ListagemRebanho = () => {
  const [animalData, setAnimalData] = useState([]);

  const updateData = useCallback(data => {
    const linkedData = data.map(obj => {
      const updatedData = { ...obj };
      const brinco = updatedData['brinco_num'];
      updatedData['pesagens'] = (
        <Link className="my-link" to={`../${brinco}`} relative='path'>
          Acessar
        </Link>
      );

      updatedData['editar'] = (
        <Link className="my-link" to={`/rebanho/${brinco}/editar`}>
          <img src={editIcon} alt="Ícone para Editar Ovino" className='edit-icon' />
        </Link>
      );
      return updatedData;
    });
    setAnimalData(linkedData);
  }, []);

  return (
    <>
      <PageTitle title="Listagem Rebanho" />
      <section className="form-cont flex-center">
        <FiltroOvinos updateSheepData={updateData} />
      </section>
      <div className="row py-3">
        {animalData.length > 0
          ? <CustomTable schema={SCHEMA} data={animalData} uniqueCol="brinco_num" />
          : <ErrorParagraph error={{ message: "Nenhum ovino cadastrado" }} />
        }
      </div>
    </>
  );
};

export default ListagemRebanho;
