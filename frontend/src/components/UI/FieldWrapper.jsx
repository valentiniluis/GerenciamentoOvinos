
const FieldWrapper = ({ wrapperClass, children }) => {
  return (
    <div className={wrapperClass}>
      {children}
    </div>
  );
}

export default FieldWrapper;