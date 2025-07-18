import { PieChart } from '@mui/x-charts/PieChart';
import { Card } from 'react-bootstrap';

export default function CardTiposFuncao({ data, permissao }) {
  if (!permissao) return null;
  if (!data || data.length === 0) {
    return (
      <Card className="mb-2">
        <Card.Header>Animais por finalidade</Card.Header>
        <Card.Body>
          <p className="text-muted">Nenhum dado disponível</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-2">
      <Card.Header>Animais por finalidade</Card.Header>
      <Card.Body>
        <PieChart
          series={[
            {
              data: data.map((item, index) => ({
                id: index,
                value: item.value,
                label: item.label,
              })),
            },
          ]}
          height={150}
        />
      </Card.Body>
    </Card>
  );
}
