import { Button } from 'react-bootstrap';

const FormBtn = ({ text, className, ...props }) => {
  let buttonCssClass = 'form-btn';
  if (className !== undefined) buttonCssClass += ' ' + className;

  return (
    <Button className={buttonCssClass} variant="primary" {...props}>
      {text}
    </Button>
  );
}

export default FormBtn;