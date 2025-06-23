import { useState } from 'react';
import { calculateWeightChange } from '../../util/utils';
import RenderFields from '../../components/layout/forms/RenderFields';


const GanhoPesoDiario = ({ data }) => {
  const [periodIndexes, setPeriodIndexes] = useState({});
  
  const changeWeightData = (event) => {
    const index = event.target.selectedOptions[0].id;
    const period = (event.target.name === 'inicio') ? 'startIdx' : 'endIdx';
    setPeriodIndexes(prev => ({ ...prev, [period]: index }));
  }

  const baseOption = [{ value: "", name: "Selecione uma etapa", hidden: true }];
  const options = data.map((pesagem, index) => ({
    name: pesagem.etapa_vida + ' - ' + pesagem.data_pesagem,
    value: pesagem.data_pesagem,
    id: index
  }));
  const allOptions = baseOption.concat(options);

  const rowPadding = 'py-3 m-0';
  const pageInputs = [
    {
      padding: rowPadding,
      wrapper: {
        class: 'medium-input',
      },
      inputProps: {
        label: 'Etapa Inicial',
        id: 'inicio',
        name: 'inicio',
        onChange: changeWeightData,
        options: allOptions
      }
    },
    {
      padding: rowPadding,
      wrapper: {
        class: 'medium-input',
      },
      inputProps: {
        label: 'Etapa Final',
        id: 'fim',
        name: 'fim',
        onChange: changeWeightData,
        options: allOptions
      }
    }
  ];

  let result = undefined;
  if (periodIndexes.startIdx !== undefined && periodIndexes.endIdx !== undefined) {
    const startData = data[periodIndexes.startIdx];
    const endData = data[periodIndexes.endIdx];
    const weightData = { startData, endData };
    result = calculateWeightChange(weightData);
  }

  return (
    <section className="limit-600">
      <h2>Ganho de Peso Diário</h2>
      <p className='my-paragraph'>Selecione a data inicial e data final para obter o valor do GPD do Ovino durante o período especificado.</p>
      <RenderFields fields={pageInputs} />
      {result === undefined ? '' : result.erro === undefined ? (
        <>
          <p className='my-paragraph'>Dias passados: {result.diasPassados}</p>
          <p className='my-paragraph'>Peso inicial: {result.pesoInicial}kg</p>
          <p className='my-paragraph'>Peso final: {result.pesoFinal}kg</p>
          <p className='my-paragraph'>Ganho de Peso por Dia: {result.GPD}kg</p>
        </>
      ) : (
        <p className='my-paragraph'>{result.erro}</p>
      )}
    </section>
  );
}


export default GanhoPesoDiario;