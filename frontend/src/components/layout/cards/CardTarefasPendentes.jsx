import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const CardTarefasPendentes = ({ tarefas, permissao }) => {
  if (!permissao) return;
  if (!tarefas || tarefas.length === 0) {
    return (
      <Card className="h-100">
        <Card.Header>
          <Card.Title className="mb-0">Tarefas Pendentes</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>Nenhuma tarefa pendente no momento.</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="h-100">
      <Card.Header>
        <Card.Title className="mb-0">Tarefas Pendentes</Card.Title>
      </Card.Header>
      <Card.Body>
        <Table hover responsive>
          <thead>
            <tr>
              <th>Data</th>
              <th>Tarefa</th>
              <th>Descrição</th>
              <th>Responsável</th>
            </tr>
          </thead>
          <tbody>
            {tarefas?.map((tarefa, index) => (
              <tr key={index}>
                <td>{new Date(tarefa.data_criacao).toLocaleDateString()}</td>
                <td>{tarefa.tarefa_nome}</td>
                <td>{tarefa.descricao || '-'}</td>
                <td>{tarefa.usuario_email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default CardTarefasPendentes;
