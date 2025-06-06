import { Link } from 'react-router-dom';


const NavOption = ({ name, icon, active, callback, path, submenu, onSubmenuClick }) => {
  return (
    <div className="row w-100 mx-0 px-0">
      <div className={`row justify-content-center w-100 m-0 p-0 ${active ? 'active' : undefined}`}>
        <div className="opt-cont">
          <div className={`d-flex gap-4 align-items-center py-1 nav-option`} onClick={callback}>
            <img className="option-icon" src={icon} alt={`${name} Sidebar Icon`} />
            {
              submenu === undefined
                ? <Link to={path} className="option-text m-0">{name}</Link>
                : <p className="option-text m-0">{name}</p>
            }
          </div>
        </div>
      </div>
      {active && submenu !== undefined && (
        <div className="submenu text-center">
          {submenu.map((sub) => (
            <Link
              key={sub.name}
              className="submenu-item no-decoration d-block m-0"
              to={`${path}/${sub.path}`}
              onClick={onSubmenuClick}
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


export default NavOption;
