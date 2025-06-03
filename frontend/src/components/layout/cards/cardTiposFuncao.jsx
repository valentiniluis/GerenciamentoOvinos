import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card } from 'react-bootstrap';

export default function BasicPie({ data }) {
  return (
    <Card className="mb-4">
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
          width={200}
          height={200}
        />
      </Card.Body>
    </Card>
  );
}
