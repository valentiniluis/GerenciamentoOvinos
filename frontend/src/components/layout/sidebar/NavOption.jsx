import { Link, useLocation } from 'react-router-dom';


const NavOption = ({ name, icon, active, callback, path, submenu, onSubmenuClick }) => {
  let cssClass = 'row justify-content-center w-100 m-0 px-0 py-4';
  if (active) cssClass += ' active-nav';

  const currentUrl = useLocation().pathname;
  const hasSubmenu = submenu !== undefined;

  let navElement = <Link to={path} className="option-text m-0">{name}</Link>;
  let submenuClass = '';
  let activeSubmenuName = null;

  if (hasSubmenu) {
    navElement = <p className="option-text m-0">{name}</p>;
    submenuClass = "submenu-item d-block m-0";
    const activeSubmenu = submenu.find(item => currentUrl === `${path}/${item.path}`);
    if (activeSubmenu) activeSubmenuName = activeSubmenu.name;
  }

  return (
    <>
      <div className={cssClass}>
        <div className="opt-cont d-flex gap-4 nav-option" onClick={callback}>
          <img className="option-icon" src={icon} alt={`${name} Sidebar Icon`} />
          {navElement}
        </div>
      </div>
      {active && hasSubmenu && (
        <div className="submenu text-center">
          {submenu.map((sub) => (
            <Link
              key={sub.name}
              className={`${submenuClass} ${sub.name === activeSubmenuName ? 'active-sub' : ''}`}
              to={`${path}/${sub.path}`}
              onClick={onSubmenuClick}
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}


export default NavOption;
