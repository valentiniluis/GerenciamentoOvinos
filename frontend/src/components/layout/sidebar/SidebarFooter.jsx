const SidebarFooter = ({ profilePicture }) => {
  return (
    <div className="row justify-content-center">
      <div className="col-6 d-flex justify-content-center align-items-center gap-4">
        <img className="profile-picture-two" src={profilePicture} alt="Foto de Perfil do Usuário" />
        <p>Meu Perfil</p>
      </div>
      <div className="col-2">
        <img className="option-icon" src="./logout.svg" alt="Ícone de Logout"/>
      </div>
    </div>
  );
};

export default SidebarFooter;