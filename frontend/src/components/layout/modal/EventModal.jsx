import { useContext, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { PermissionsContext } from '../../../store/permissions-context';
import { useSubmit } from 'react-router-dom';

const EventModal = ({ show, onClose, event, date }) => {
  const permissions = useContext(PermissionsContext);
  const submit = useSubmit();
  const formRef = useRef();
  const canAlter = permissions.perm_alter_calendario;
  const isEditing = (event !== null);
  const formMethod = (isEditing) ? 'PUT' : 'POST';

  const handleSave = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const submitData = Object.fromEntries(formData.entries());
    submit(submitData, { action: '/calendario', method: formMethod });
    onClose();
  }

  const handleDelete = () => {
    const title = event.tarefa_nome;
    submit(null, { action: `/calendario/excluir?title=${title}&date=${date}`, method: 'DELETE' });
    onClose();
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Form onSubmit={handleSave} ref={formRef}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="hidden" value="admin@admin.com" name="usuario_email" />
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              required
              type="text"
              name="tarefa_nome"
              id="tarefa_nome"
              placeholder="Digite o título da tarefa"
              defaultValue={event?.tarefa_nome}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              name="descricao"
              id="descricao"
              as="textarea"
              rows={3}
              placeholder="Digite a descrição da tarefa (opcional)"
              defaultValue={event?.descricao}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data</Form.Label>
            <Form.Control
              type="date"
              name="data_criacao"
              id="data_criacao"
              defaultValue={date}
              readOnly
            />
          </Form.Group>
          {isEditing ? (
            <input 
              name="tarefa_nome_original" 
              id="tarefa_nome_original" 
              type='hidden' 
              value={event.tarefa_nome} 
            />
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Fechar
          </Button>
          {
            isEditing && canAlter ? (
              <>
                <Button variant="danger" type='button' onClick={handleDelete}>
                  Excluir
                </Button>
                <Button variant="primary" type='submit'>
                  Editar
                </Button>
              </>
            ) : !isEditing ? (
              <Button variant="primary" type='submit'>
                Salvar
              </Button>
            ) : null
          }
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EventModal;