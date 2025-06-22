import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

import api from '../../../api/request';
import ApiAlert from '../../UI/ApiAlert';

const EventModal = ({ show, onClose, onSave, initialDate }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const [ error, setError ] = useState(null);



  const handleSave = async () => {
    if (!titulo) return alert('Informe corretamente um título.');
    if (!initialDate) return alert('Data inválida.');

    try {
      const data = {
        data_criacao: initialDate,
        tarefa_nome: titulo,
        descricao: descricao || null,
        usuario_email: 'admin@admin.com'
      }

      const result = await api.post('/tarefas', data);
      console.log('Resultado do POST:', result);
      onSave({ titulo });
    } catch (err) {
      console.error('Erro ao salvar tarefa:', err);
      setError(err.response?.data?.message || 'Erro inesperado. Tente novamente mais tarde.');
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Nova Tarefa</Modal.Title>
      </Modal.Header>
      {error && <ApiAlert variant="danger" message={error} onClose={() => setError(null)} />}
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitulo" className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o título da tarefa"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              autoFocus
            />
          </Form.Group>

          <Form.Group controlId="formDescricao" className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Digite a descrição da tarefa (opcional)"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formDate" className="mb-3">
            <Form.Label>Data</Form.Label>
            <Form.Control type="text" readOnly value={initialDate} />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
