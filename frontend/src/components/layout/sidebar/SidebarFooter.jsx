import logoutIcon from '/logout.svg';

const SidebarFooter = ({ profilePicture }) => {
  return (
    <div className="row justify-content-center py-3 border-top">
      <div className="col-6 d-flex justify-content-center align-items-center gap-3">
        <img
          className="profile-picture-two"
          src={profilePicture}
          alt="Foto de Perfil do Usuário"
        />
        <p className="m-0 sidebar-text">Meu Perfil</p>
      </div>
      <div className="col-2 d-flex align-items-center justify-content-center mx-2">
        <img className="option-icon" src={logoutIcon} alt="Ícone de Logout" />
      </div>
    </div>
  );
};

export default SidebarFooter;
