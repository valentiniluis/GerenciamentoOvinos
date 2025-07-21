import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import FormBtn from '../../UI/FormBtn';


const Confirmation = ({ title, text, children, btnText, className='delete-btn', ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => setIsModalOpen(false);
  const handleOpen = () => setIsModalOpen(true);

  const handleConfirm = () => {
    props.onClick();
    handleClose();
  }

  return (
    <>
      <FormBtn text={children} type="button" className={className} onClick={handleOpen} />

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
          <Button {...props} onClick={handleConfirm}>
            {btnText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default Confirmation;