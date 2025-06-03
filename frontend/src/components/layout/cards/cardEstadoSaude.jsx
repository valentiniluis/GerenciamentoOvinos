import React from 'react';
import { Card } from 'react-bootstrap';
import { BarChart } from '@mui/x-charts/BarChart'

export default function BarCard({ labels, series }) {
  return (
    <Card className="mb-4">
      <Card.Header>Saúde animal</Card.Header>
      <Card.Body>
        <BarChart xAxis={[{ data: labels }]} series={series} height={200} />
      </Card.Body>
    </Card>
  );
}
