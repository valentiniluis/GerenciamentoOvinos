const SidebarHeader = ({ user, profilePicture }) => {
  return (
    <div className="row d-flex justify-content-center m-0 gap-3 py-3 border-bottom">
      <img
        className="profile-picture-one"
        src={profilePicture}
        alt="Foto de Perfil"
      />
      <p className="text-center">{user}</p>
    </div>
  );
};

export default SidebarHeader;
