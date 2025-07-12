import deleteIcon from '/delete_icon.svg';
import deleteIconDisabled from '/delete_icon_disabled.svg';
import DeleteConfirmation from '../layout/modal/DeleteConfirmation';
import FormBtn from './FormBtn';


const DeleteIcon = ({ confirm, modalText, modalTitle, disabled=false }) => {
  const buttonContent = (
    <img src={disabled ? deleteIconDisabled : deleteIcon} alt="Ícone para excluir" />
  )

  if (disabled) {
    return (
      <FormBtn 
        className="delete-btn-icon"
        text={buttonContent}
      />
    );
  }

  return (
    <DeleteConfirmation 
      confirm={confirm} 
      title={modalTitle} 
      text={modalText} 
      className="delete-btn-icon"
      buttonText={buttonContent}
    />
  );
}


export default DeleteIcon;