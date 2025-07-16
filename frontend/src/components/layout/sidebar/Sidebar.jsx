import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../../styles/sidebar.css';
import GroupIcon from '/Group_2.png';
import SidebarHeader from './SidebarHeader.jsx';
import NavOption from './NavOption.jsx';
import SidebarFooter from './SidebarFooter.jsx';
import menuIcon from '/menu_hamburger.svg';

import NAVIGATION_OPTIONS from '../../../util/navigationOptions.js';
import { PermissionsContext } from '../../../store/permissions-context.jsx';

// fazer autorização na sidebar mobile também

const Sidebar = ({ user, email }) => {
  const permissions = useContext(PermissionsContext);
  const location = useLocation();

  const [activeOption, setActiveOption] = useState();
  const [menuOpen, setMenuOpen] = useState(false);

  const path = location.pathname;
  useEffect(() => {
    const currentPage = NAVIGATION_OPTIONS.find(option => {
      const { props } = option;
      return (props.path === path) || (props.path !== '/' && path.startsWith(props.path));
    })?.props;
    setActiveOption(currentPage?.name);
  }, [path]);


  const handleSelectOption = (option) => {
    setActiveOption(option.name);
    if (!option.submenu) handleCloseSubmenu();
  };

  const handleCloseSubmenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="sidebar d-none d-md-flex">
        {/* Sidebar padrão para telas médias/grandes */}
        <div>
          <SidebarHeader user={user} profilePicture={GroupIcon} />
          <div id="nav-options-container" className="row pt-3 m-0">
            {NAVIGATION_OPTIONS.map((option) => {
              const { permissionsRequired, props } = option;
              const authorized = (permissionsRequired.length === 0) ||
                permissionsRequired.some(permReq => permissions[permReq] == true);
              if (!authorized) return null;
              return (
                <NavOption
                  key={props.name}
                  active={activeOption === props.name}
                  selectOption={() => handleSelectOption(props)}
                  {...props}
                />
              )
            })}
          </div>
        </div>
        <SidebarFooter profilePicture={GroupIcon} userEmail={email} />
      </nav>

      {/* Navbar responsivo para telas pequenas */}
      <nav className="navbar-mobile d-flex d-md-none align-items-center justify-content-between px-3 py-2">
        <img src={menuIcon} alt="Abrir menu" className="menu-icon" onClick={() => setMenuOpen(prevOpen => !prevOpen)} />
        <span className="navbar-mobile-title">Menu</span>
        <img
          className="profile-picture-two"
          src={GroupIcon}
          alt="Foto de Perfil do Usuário"
        />
        {menuOpen && (
          <div className="navbar-mobile-dropdown">
            {NAVIGATION_OPTIONS.map((option) => (
              <div key={option.props.name}>
                <NavOption
                  {...option.props}
                  active={activeOption === option.props.name}
                  selectOption={() => handleSelectOption(option.props)}
                  onSubmenuClick={handleCloseSubmenu}
                />
              </div>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Sidebar;