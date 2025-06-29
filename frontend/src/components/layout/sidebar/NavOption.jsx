import { Link, useLocation } from 'react-router-dom';


const NavOption = ({ name, icon, active, selectOption, path, submenu, onSubmenuClick }) => {
  const currentUrl = useLocation().pathname;
  const hasSubmenu = submenu !== undefined;

  let cssClass = 'row justify-content-center w-100 m-0 px-0 py-4';
  if (active) cssClass += ' active-nav';
  let navElement = <Link to={path} className="option-text m-0">{name}</Link>;
  let submenuLinks;

  if (hasSubmenu) navElement = <p className="option-text m-0">{name}</p>;

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
        <div className="opt-cont d-flex gap-4 nav-option" onClick={() => selectOption(name)}>
          <img className="option-icon" src={icon} alt={`${name} Sidebar Icon`} />
          {navElement}
        </div>
      </div>
      {active && hasSubmenu && (
        <div className="submenu text-center">
          {submenuLinks}
        </div>
      )}
    </>
  );
}


export default NavOption;
