import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { PermissionsContext } from '../../../store/permissions-context';

const OptionWrapper = ({ children, hasSubmenu, name, selectOption, path }) => {
  const handleClick = () => selectOption(name);

  if (!hasSubmenu) return (
    <Link to={path} className='nav-option gap-3 option-link' onClick={handleClick}>
      {children}
    </Link>
  );

  return (
    <div className="d-flex gap-3 nav-option" onClick={handleClick}>
      {children}
    </div>
  );
}


const NavOption = ({ name, icon, active, selectOption, path, submenu, onSubmenuClick }) => {
  const location = useLocation();
  const permissions = useContext(PermissionsContext);

  const currentUrl = location.pathname;
  const hasSubmenu = (submenu !== undefined);

  let cssClass = 'row m-0 px-0 py-3';
  if (active) cssClass += ' active-nav';

  let submenuLinks;
  if (hasSubmenu && active) {
    submenuLinks = submenu.map(sub => {
      const { permissionRequired } = sub;
      const authorized = permissions[permissionRequired] == true;
      if (!authorized) return null;

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
        <OptionWrapper hasSubmenu={hasSubmenu} name={name} selectOption={selectOption} path={path}>
          <img className="option-icon" src={icon} alt={`${name} Sidebar Icon`} />
          <p className="option-text">{name}</p>
        </OptionWrapper>
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
