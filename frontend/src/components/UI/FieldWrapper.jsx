
const sizeClasses = {
  'small-input': 'col-lg-4 col-md-5 col-sm-6 col-8',
  'medium-input': 'col-md-6 col-sm-8 col-10',
  'large-input': 'col-12'
}

const FieldWrapper = ({ wrapperClass, fieldSize, children }) => {
  let fieldClass = sizeClasses[fieldSize];
  if (wrapperClass) fieldClass += ' ' + wrapperClass;

  return (
    <div className={fieldClass}>
      {children}
    </div>
  );
}

export default FieldWrapper;