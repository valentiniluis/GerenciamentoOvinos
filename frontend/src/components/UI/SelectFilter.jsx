import { Form } from 'react-bootstrap';

const SelectFilter = ({ label, options, updateFilter, ...props }) => {

  const handleChange = event => updateFilter(event.target.value)

  return (
    <>
      {label ? <Form.Label className='my-label'>{label}</Form.Label> : null}
      <Form.Select {...props} onChange={handleChange}>
        {options.map(option => (
          <option key={option.name} value={option.value} {...option}>{option.name}</option>
        ))}
      </Form.Select>
    </>
  );
}

export default SelectFilter;