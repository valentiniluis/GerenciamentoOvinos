import { Card } from 'react-bootstrap';
import { BarChart, BarLabel } from '@mui/x-charts/BarChart';

export default function CardQuantidadeRaca({ labels, series, permissao }) {
  if (!permissao) return null;

  if (!series || !Array.isArray(series) || series.length === 0) {
    return (
      <Card className="mb-2 dashboard-card">
        <Card.Header>Raças Predominantes no Rebanho</Card.Header>
        <Card.Body>
          <p className="text-muted">Nenhum dado disponível</p>
        </Card.Body>
      </Card>
    );
  }

  const mergedArray = [];
  for (let i = 0; i < labels.length; i++) mergedArray.push([labels[i], series[0].data[i]]);
  mergedArray.sort((a, b) => a[1] - b[1]);
  const mostCommon = mergedArray.slice(mergedArray.length - 5);
  const chartLabels = mostCommon.map(entry => entry[0]);
  const chartValues = [{ data: mostCommon.map(entry => entry[1]) }];

  return (
    <Card className="mb-2 dashboard-card">
      <Card.Header>Raças Predominantes no Rebanho</Card.Header>
      <Card.Body>
        <BarChart 
          yAxis={[{ data: chartLabels }]} 
          series={chartValues}
          layout='horizontal' 
          height={230}
        />
      </Card.Body>
    </Card>
  );
}
