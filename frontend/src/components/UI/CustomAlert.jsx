import { Alert } from 'react-bootstrap';

const CustomAlert = ({ variant, message, onClose }) => {

  if (!message) return null;

  return (
    <Alert variant={variant} dismissible onClose={onClose} className='my-4'>
      {message}
    </Alert>
  );
};

export default CustomAlert;