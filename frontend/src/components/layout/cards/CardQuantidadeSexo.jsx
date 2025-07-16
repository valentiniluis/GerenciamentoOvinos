import { PieChart } from '@mui/x-charts/PieChart';
import { Card } from 'react-bootstrap';

export default function CardQuantidadeSexo({ data }) {
  const formattedData =
    data?.map((item) => ({
      id: item.sexo,
      value: parseInt(item.total),
      label: item.sexo === 'M' ? 'Macho' : 'Fêmea',
      color: item.sexo === 'M' ? '#2196f3' : '#e91e63',
    })) || [];

  return (
    <Card className="mb-2">
      <Card.Header>Quantidade por Sexo</Card.Header>
      <Card.Body>
        <PieChart
          series={[
            {
              data: formattedData,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30 },
              startAngle: 0,
              endAngle: 180
            },
          ]}
          height={150}
        />
      </Card.Body>
    </Card>
  );
}
