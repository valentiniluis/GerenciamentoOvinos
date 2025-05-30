import React from 'react';

const InputField = ({ label, input, size, labelClass }) => {
  return (
    <div className={`${size}`}>
      <label className={`my-label ${labelClass}`} htmlFor={input.id}>{label}</label>
      {input}
    </div>
  );
};

export default InputField;
