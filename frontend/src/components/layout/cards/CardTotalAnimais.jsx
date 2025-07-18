import { LineChart } from '@mui/x-charts/LineChart';
import { Card } from 'react-bootstrap';

export default function CardTotalAnimais({ xLabels, series, permissao }) {
  if (!permissao) return null;
  if (!xLabels || !series || series.length === 0) {
    return (
      <Card className="mb-2">
        <Card.Header>Total animais</Card.Header>
        <Card.Body>
          <p className="text-muted">Nenhum dado disponível</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-2">
      <Card.Header>Total animais</Card.Header>
      <Card.Body>
        <LineChart xAxis={[{ data: xLabels, label: 'Meses' }]} series={series} height={150} />
      </Card.Body>
    </Card>
  );
}
