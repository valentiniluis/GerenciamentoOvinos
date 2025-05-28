import React from 'react';

const InputField = ({ label, name, type="text" }) => {
  return (
    <>
      <label className="my-label" htmlFor={name}>{label}</label>
      <input id={name} type={type} name={name} className="form-input" step={null} />
    </>
  );
};

export default InputField;
