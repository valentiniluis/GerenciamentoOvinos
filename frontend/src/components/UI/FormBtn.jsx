import { Button } from 'react-bootstrap';

const FormBtn = ({ text, variant="primary", className, ...props }) => {
  let buttonCssClass = 'form-btn';
  if (className !== undefined) buttonCssClass += ' ' + className;

  return (
    <Button className={buttonCssClass} variant={variant} {...props}>
      {text}
    </Button>
  );
}

export default FormBtn;