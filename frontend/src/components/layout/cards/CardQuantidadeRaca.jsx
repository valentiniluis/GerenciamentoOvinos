import { Card } from 'react-bootstrap';
import { BarChart } from '@mui/x-charts/BarChart';

export default function CardQuantidadeRaca({ labels, series, permissao }) {
  if (!permissao) return null;

  if (!series || !Array.isArray(series) || series.length === 0) {
    return (
      <Card className="mb-2">
        <Card.Header>Quantidade por raçaasdg</Card.Header>
        <Card.Body>
          <p className="text-muted">Nenhum dado disponível</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-2">
      <Card.Header>Quantidade por errado</Card.Header>
      <Card.Body>
        <BarChart xAxis={[{ data: labels }]} series={series} height={150} />
      </Card.Body>
    </Card>
  );
}
