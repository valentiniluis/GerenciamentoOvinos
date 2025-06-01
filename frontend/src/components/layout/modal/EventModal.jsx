import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const EventModal = ({ show, onClose, onSave, initialDate }) => {
  const [titulo, setTitulo] = useState('');
  const [allDay, setAllDay] = useState(true);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');

  const handleSave = () => {
    if (!titulo) return alert('Informe corretamente um título.');

    let start = initialDate;
    let end = initialDate;

    if (!allDay) {
      start = `${initialDate}T${startTime}:00`;
      end = `${initialDate}T${endTime}:00`;
    }

    onSave({ titulo, start, end, allDay });
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Nova Tarefa</Modal.Title>
      </Modal.Header>
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

          <Form.Group controlId="formDate" className="mb-3">
            <Form.Label>Data</Form.Label>
            <Form.Control type="text" readOnly value={initialDate} />
          </Form.Group>

          <Form.Group controlId="formAllDay" className="mb-3">
            <Form.Check
              type="checkbox"
              label="Dia inteiro"
              checked={allDay}
              onChange={() => setAllDay(!allDay)}
            />
          </Form.Group>

          {!allDay && (
            <>
              <Form.Group controlId="formStartTime" className="mb-3">
                <Form.Label>Hora Início</Form.Label>
                <Form.Control
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formEndTime" className="mb-3">
                <Form.Label>Hora Fim</Form.Label>
                <Form.Control
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </Form.Group>
            </>
          )}
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
