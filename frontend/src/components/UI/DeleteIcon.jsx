import Confirmation from '../layout/modal/Confirmation.jsx';
import FormBtn from './FormBtn.jsx';
import deleteIcon from '/delete_icon.svg';
import deleteIconDisabled from '/delete_icon_disabled.svg';


const DeleteIcon = ({ confirm, modalText, modalTitle, disabled = false }) => {
  const buttonContent = (
    <img src={disabled ? deleteIconDisabled : deleteIcon} alt="Ícone para excluir" />
  )

  if (disabled) {
    return <FormBtn className="delete-btn-icon" text={buttonContent} />
  }

  return (
    <Confirmation
      title={modalTitle}
      text={modalText}
      className="delete-btn-icon"
      btnText="Excluir"
      onClick={confirm}
      variant="danger"
    >
      {buttonContent}
    </Confirmation>
  );
}


export default DeleteIcon;