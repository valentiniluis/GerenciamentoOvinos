import { Button } from 'react-bootstrap';

const FormBtn = ({ text, ...props }) => {
  return (
    <Button className="form-btn" variant="primary" {...props}>
      {text}
    </Button>
  );
}

export default FormBtn;