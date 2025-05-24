const SidebarHeader = ({ user, profilePicture }) => {
  return (
    <div className="row d-flex justify-content-center">
      <img className="profile-picture-one"
        src={profilePicture} alt="Foto de Perfil"/>
      <p className="text-center">{user}</p>
    </div>
  );
}

export default SidebarHeader;