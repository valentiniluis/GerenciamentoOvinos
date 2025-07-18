import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import FormBtn from '../../UI/FormBtn';


const DeleteConfirmation = ({ title, text, confirm, buttonText, className='delete-btn' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => setIsModalOpen(false);
  const handleOpen = () => setIsModalOpen(true);

  return (
    <>
      <FormBtn text={buttonText} type="button" className={className} onClick={handleOpen} />

      <Modal show={isModalOpen} centered>
        <Modal.Header>
          <Modal.Title>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {text}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant='danger' onClick={confirm}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default DeleteConfirmation;