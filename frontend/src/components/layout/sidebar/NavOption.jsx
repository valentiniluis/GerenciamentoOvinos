const NavOption = ({ name, icon, callback }) => {
  return (
    <div className="d-flex gap-4 align-items-center py-1 nav-option"
      onClick={callback}>
      <img className="option-icon" src={icon} alt={`${name} Sidebar Icon`} />
      <p className="option-text m-0">{name}</p>
    </div>
  );
};

export default NavOption;
