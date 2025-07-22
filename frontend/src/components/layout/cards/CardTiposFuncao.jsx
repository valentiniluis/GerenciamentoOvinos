import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Card } from 'react-bootstrap';

export default function CardTiposFuncao({ data, permissao }) {
  if (!permissao) return null;
  if (!data || data.length === 0) {
    return (
      <Card className="mb-2 dashboard-card">
        <Card.Header>Animais por finalidade</Card.Header>
        <Card.Body>
          <p className="text-muted">Nenhum dado disponível</p>
        </Card.Body>
      </Card>
    );
  }

  const TOTAL = data.map(item => item.value).reduce((acc, current) => acc + current);
  const getArcLabel = (param) => (param.value / TOTAL * 100).toFixed(1) + '%';

  return (
    <Card className="mb-2 dashboard-card">
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
              arcLabel: getArcLabel
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
              fontSize: 15,
            },
          }}
          height={190}
        />
      </Card.Body>
    </Card>
  );
}
