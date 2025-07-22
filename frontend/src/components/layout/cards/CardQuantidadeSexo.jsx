import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Card } from 'react-bootstrap';

export default function CardQuantidadeSexo({ data, permissao }) {
  if (!permissao) return null;
  if (!data || data.length === 0) {
    return (
      <Card className="mb-2 dashboard-card">
        <Card.Header>Quantidade por Sexo</Card.Header>
        <Card.Body>
          <p className="text-muted">Nenhum dado disponível</p>
        </Card.Body>
      </Card>
    );
  }

  const formattedData = data?.map((item) => ({
    id: item.sexo,
    value: +item.total,
    label: item.sexo === 'M' ? 'Macho' : 'Fêmea',
    color: item.sexo === 'M' ? '#2196f3' : '#e91e63',
  })) || [];

  const TOTAL = formattedData.map(data => data.value).reduce((acc, current) => acc + current);
  const getArcLabel = (param) => (param.value / TOTAL * 100).toFixed(1) + '%';

  return (
    <Card className="mb-2 dashboard-card">
      <Card.Header>Quantidade por Sexo</Card.Header>
      <Card.Body>
        <PieChart
          series={[
            {
              data: formattedData,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30 },
              startAngle: 0,
              endAngle: 360,
              arcLabel: getArcLabel
            }
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
