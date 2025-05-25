import React from 'react';

const InputField = ({ name, nameSize = 2, inputSize = 7 }) => {
  return (
    <div className="row justify-content-center align-items-center">
      <div className={`col-${nameSize}`}>
        <p>{name}</p>
      </div>
      <div className={`col-${inputSize}`}>
        <input className="form-input" type="text" />
      </div>
    </div>
  );
};

export default InputField;
