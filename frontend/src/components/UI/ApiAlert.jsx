import { useActionData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

const ApiAlert = () => {
  const actionData = useActionData();
  const [messageProps, setMessageProps] = useState({ message: null, variant: null });

  useEffect(() => {
    if (!actionData) return;
    const { isError, message } = actionData;
    const variant = (isError) ? 'danger' : 'success';
    setMessageProps({ message, variant });
  }, [actionData]);

  const handleClose = () => setMessageProps({ message: null, variant: null });
  
  if (!messageProps.message) return null;

  return (
    <Alert variant={messageProps.variant} dismissible onClose={handleClose}>
      {messageProps.message}
    </Alert>
  );
};

export default ApiAlert;