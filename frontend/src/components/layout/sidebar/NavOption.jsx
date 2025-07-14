import { Link, useLocation } from 'react-router-dom';


const NavOption = ({ name, icon, active, selectOption, path, submenu, onSubmenuClick }) => {
  const currentUrl = useLocation().pathname;
  const hasSubmenu = submenu !== undefined;

  let cssClass = 'row m-0 px-0 py-3';
  if (active) cssClass += ' active-nav';

  let navElement = <Link to={path} className="option-text">{name}</Link>;
  if (hasSubmenu) navElement = <p className="option-text">{name}</p>;

  let submenuLinks;
  if (hasSubmenu && active) {
    submenuLinks = submenu.map((sub) => {
      const subpath = `${path}/${sub.subpath}`;
      const isActive = (subpath === currentUrl);
      let cssClass = "submenu-item d-block m-0";
      if (isActive) cssClass += ' active-sub';

      return (
        <Link key={sub.name} className={cssClass} to={subpath} onClick={onSubmenuClick}>
          {sub.name}
        </Link>
      )
    });
  }

  return (
    <>
      <div className={cssClass}>
        <div className="d-flex gap-3 nav-option" onClick={() => selectOption(name)}>
          <img className="option-icon" src={icon} alt={`${name} Sidebar Icon`} />
          {navElement}
        </div>
      </div>
      {active && hasSubmenu && (
        <div className="submenu">
          {submenuLinks}
        </div>
      )}
    </>
  );
}


export default NavOption;
