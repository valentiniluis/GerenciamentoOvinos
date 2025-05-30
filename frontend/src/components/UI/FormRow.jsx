
// se há mais de um input na 'linha' (ou seja, terá um input ao lado do outro), usa-se display: flex
// e justify-content: between para espaçar os elementos. Se for um elemento só, ele ficará alinhado à esquerda

const FormRow = ({ padding, children }) => {
  return (
    <div className={`row ${padding} ${children.length > 1 ? 'd-flex justify-content-between' : '' }`}>
      {children}
    </div>
  );
}

export default FormRow;
