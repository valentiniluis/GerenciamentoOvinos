
// se há mais de um input na 'linha' (ou seja, terá um input ao lado do outro), usa-se display: flex
// e justify-content: between para espaçar os elementos. Se for um elemento só, ele ficará alinhado à esquerda

const FormRow = ({ children }) => {
  let rowClass = 'row';
  if (children.length > 1) rowClass += ' d-flex justify-content-between';

  return (
    <div className={rowClass}>
      {children}
    </div>
  );
}

export default FormRow;
