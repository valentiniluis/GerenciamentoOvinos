import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Card } from 'react-bootstrap';

export default function CardTotalAnimais({ xLabels, series }) {
  return (
    <Card className="mb-2">
      <Card.Header>Total animais</Card.Header>
      <Card.Body>
        <LineChart xAxis={[{ data: xLabels }]} series={series} height={150} />
      </Card.Body>
    </Card>
  );
}
