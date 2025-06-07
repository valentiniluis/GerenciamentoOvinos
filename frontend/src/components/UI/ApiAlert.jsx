import { Alert } from 'react-bootstrap';

const ApiAlert = ({ variant, message, onClose }) => {

    if (!message) return null;

    return (
        <Alert variant={variant} dismissible onClose={onClose}>
            {message}
        </Alert>
    );
};

export default ApiAlert;