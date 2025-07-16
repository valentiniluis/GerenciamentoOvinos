import { Card, Table } from 'react-bootstrap';

const CardPesagensRecentes = ({ pesagens }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Últimas Pesagens</Card.Title>
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
