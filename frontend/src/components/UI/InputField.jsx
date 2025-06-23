import { Form } from 'react-bootstrap';

const InputField = ({ label, labelClass, type, ...inputProps }) => {
  let labelCss = 'my-label';
  if (labelClass !== undefined) labelCss += ' ' + labelClass;

  if (type === 'checkbox' || type === 'radio') {
    return (
      <>
        <input type="checkbox" {...inputProps} />
        <label className={labelCss} htmlFor={inputProps.id}>{label}</label>
      </>
    )
  }

  else return (
    <>
      <Form.Label className={labelCss} htmlFor={inputProps.id}>{label}</Form.Label>
      <Form.Control type={type} {...inputProps} />
    </>
  )
};

export default InputField;
