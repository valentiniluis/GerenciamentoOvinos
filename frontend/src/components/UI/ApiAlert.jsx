import { useActionData } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';

const ApiAlert = () => {
  const actionData = useActionData();
  const [messageProps, setMessageProps] = useState({ message: null, variant: null });
  const timeoutRef = useRef();

  useEffect(() => {
    if (!actionData) return;
    const { isError, message } = actionData;
    const variant = (isError) ? 'danger' : 'success';
    setMessageProps({ message, variant });

    const TIMEOUT_MS = 3000;
    timeoutRef.current = setTimeout(handleClose, TIMEOUT_MS);
  }, [actionData]);

  const handleClose = () => setMessageProps({ message: null, variant: null });
  
  const handleCloseBtn = () => {
    clearTimeout(timeoutRef.current);
    handleClose();
  }

  if (!messageProps.message) return null;

  return (
    <Alert variant={messageProps.variant} dismissible onClose={handleCloseBtn}>
      {messageProps.message}
    </Alert>
  );
};

export default ApiAlert;