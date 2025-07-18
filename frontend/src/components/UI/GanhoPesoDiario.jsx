import { Card } from 'react-bootstrap';
import { useState } from 'react';
import { calculateWeightChange } from '../../util/utilFunctions.js';
import RenderFields from '../../components/layout/forms/RenderFields.jsx';
import ErrorParagraph from './ErrorParagraph.jsx';
import classes from '../../styles/Card.module.css';


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
    <>
      <section className="limit-600">
        <h2>Ganho de Peso Diário</h2>
        <RenderFields fields={pageInputs} />
      </section>
      {result === undefined ? null : result.erro === undefined ? (
        // cards
        <section className='row justify-content-between pb-5'>
          <Card className={classes.card}>
            <Card.Body className={classes.cardBody}>
              <Card.Title>Tempo Passado</Card.Title>
              <hr className={classes.cardHr} />
              <Card.Text className={classes.cardText}>{result.diasPassados} Dias</Card.Text>
            </Card.Body>
          </Card>
          <Card className={classes.card}>
            <Card.Body className={classes.cardBody}>
              <Card.Title>Peso inicial</Card.Title>
              <hr className={classes.cardHr} />
              <Card.Text className={classes.cardText}>{result.pesoInicial}kg</Card.Text>
            </Card.Body>
          </Card>
          <Card className={classes.card}>
            <Card.Body className={classes.cardBody}>
              <Card.Title>Peso final</Card.Title>
              <hr className={classes.cardHr} />
              <Card.Text className={classes.cardText}>{result.pesoFinal}kg</Card.Text>
            </Card.Body>
          </Card>
          <Card className={classes.card}>
            <Card.Body className={classes.cardBody}>
              <Card.Title>Ganho de Peso</Card.Title>
              <hr className={classes.cardHr} />
              <Card.Text className={classes.cardText}>{result.GPD}kg por dia</Card.Text>
            </Card.Body>
          </Card>
        </section>
      ) : <ErrorParagraph error={{ message: result.erro }} />
      }
    </>
  );
}


export default GanhoPesoDiario;