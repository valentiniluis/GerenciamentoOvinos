import { Form } from 'react-bootstrap';

const InputField = ({ label, labelClass, type, ...inputProps }) => {
  if (type === 'checkbox' || type === 'radio') return (
    <Form.Check type={type} label={label} {...inputProps} />
  )

  else return (
    <>
      <Form.Label className={`my-label ${labelClass ? labelClass : ''}`} htmlFor={inputProps.id}>{label}</Form.Label>
      <Form.Control type={type} {...inputProps} />
    </>
  )
};

export default InputField;
