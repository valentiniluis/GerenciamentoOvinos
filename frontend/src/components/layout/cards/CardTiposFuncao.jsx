import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card } from 'react-bootstrap';

export default function CardTiposFuncao({ data }) {
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
