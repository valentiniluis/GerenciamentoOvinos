const NavOption = ({ name, icon }) => {

  return (
    <div className="d-flex gap-4 py-2">
      <img className='option-icon' src={icon} alt={`${name} Sidebar Icon`} />
      <p className="h-100 option-text">{name}</p>
    </div>
  );
}

export default NavOption;