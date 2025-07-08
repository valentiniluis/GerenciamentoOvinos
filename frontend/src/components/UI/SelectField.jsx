import { Form } from 'react-bootstrap';

const SelectField = ({ label, options, ...props }) => {
  return (
    <>
      {label ? <Form.Label className='my-label'>{label}</Form.Label> : null}
      <Form.Select {...props}>
        {options.map(option => (
          <option key={option.name} value={option.value} {...option}>{option.name}</option>
        ))}
      </Form.Select>
    </>
  );
}

export default SelectField;