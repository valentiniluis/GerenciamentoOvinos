import { Card, Table } from 'react-bootstrap';

const CardPesagensRecentes = ({ pesagens, permissao }) => {
  if (!permissao) return null;
  if (!pesagens || pesagens.length === 0) {
    return (
      <Card className="mb-4 dashboard-card">
        <Card.Body>
          <Card.Title>Últimas Pesagens</Card.Title>
          <p className="text-muted">Nenhum dado disponível</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-4 dashboard-card">
      <Card.Header>Últimas Pesagens</Card.Header>
      <Card.Body>
        <Table striped responsive>
          <thead>
            <tr>
              <th>Brinco</th>
              <th>Peso</th>
              <th>Data</th>
              <th>Etapa</th>
            </tr>
          </thead>
          <tbody>
            {pesagens.map((pesagem, index) => (
              <tr key={index}>
                <td>{pesagem.ovino_brinco}</td>
                <td>{pesagem.peso} kg</td>
                <td>{new Date(pesagem.data_pesagem).toLocaleDateString()}</td>
                <td>{pesagem.etapa_vida}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default CardPesagensRecentes;
