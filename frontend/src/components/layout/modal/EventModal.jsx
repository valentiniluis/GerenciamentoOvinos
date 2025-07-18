import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import api from '../../../api/request';
import ApiAlert from '../../UI/ApiAlert';

const EventModal = ({ show, onClose, onSave, initialDate, initialEvent }) => {
  const [titulo, setTitulo] = useState(initialEvent?.tarefa_nome || '');
  const [descricao, setDescricao] = useState(initialEvent?.descricao || '');

  // Atualiza campos ao abrir modal para edição
  useEffect(() => {
    setTitulo(initialEvent?.tarefa_nome || '');
    setDescricao(initialEvent?.descricao || '');
  }, [initialEvent, show]);

  const handleSave = async () => {
    if (!titulo) return alert('Informe corretamente um título.');
    if (!initialDate) return alert('Data inválida.');
    onSave({ titulo, descricao });
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{initialEvent ? 'Editar Tarefa' : 'Nova Tarefa'}</Modal.Title>
      </Modal.Header>
      <ApiAlert />
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