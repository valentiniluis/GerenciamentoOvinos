import React from 'react';
import { Card } from 'react-bootstrap';
import { BarChart } from '@mui/x-charts/BarChart'

export default function CardQuantidadeRaca({ labels, series }) {
  return (
    <Card className="mb-2">
      <Card.Header>Quantidade por raça</Card.Header>
      <Card.Body>
        <BarChart xAxis={[{ data: labels }]} series={series} height={150} />
      </Card.Body>
    </Card>
  );
}
