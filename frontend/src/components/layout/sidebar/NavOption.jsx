const NavOption = ({ name, icon, onClick, active }) => {
  return (
    <div
      className={`d-flex gap-4 py-1 align-items-center nav-option ${
        active ? 'active' : ''
      }`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <img className="option-icon" src={icon} alt={`${name} Sidebar Icon`} />
      <p className="option-text m-0">{name}</p>
    </div>
  );
};

export default NavOption;
