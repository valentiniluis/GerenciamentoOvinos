const SidebarHeader = ({ user, profilePicture }) => {
  return (
    <div className="row d-flex justify-content-center gap-3">
      <img className="profile-picture-one"
        src={profilePicture} alt="Foto de Perfil"/>
      <p className="text-center sidebar-text">{user}</p>
    </div>
  );
}

export default SidebarHeader;