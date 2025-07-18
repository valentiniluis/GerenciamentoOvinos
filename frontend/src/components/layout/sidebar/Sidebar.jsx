import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../../styles/sidebar.css';
import SidebarHeader from './SidebarHeader.jsx';
import NavOption from './NavOption.jsx';
import SidebarFooter from './SidebarFooter.jsx';
import UserInitialSpan from './UserInitialSpan.jsx';
import NAVIGATION_OPTIONS from '../../../util/navigationOptions.js';
import { PermissionsContext } from '../../../store/permissions-context.jsx';
import menuIcon from '/menu_hamburger.svg';


const Sidebar = ({ user }) => {
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

  useEffect(() => {
    handleCloseSubmenu();
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
        <div id="sidebar-container">
          <div>
            <SidebarHeader user={user} />
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
          <SidebarFooter />
        </div>
      </nav>

      {/* Navbar responsivo para telas pequenas */}
      <nav className="navbar-mobile d-flex d-md-none align-items-center justify-content-between px-3 py-2">
        <img src={menuIcon} alt="Abrir menu" className="menu-icon" onClick={() => setMenuOpen(prevOpen => !prevOpen)} />
        <span className="navbar-mobile-title">Menu</span>
        <UserInitialSpan>{user[0]}</UserInitialSpan>
        {menuOpen && (
          <div id="nav-options-container" className="navbar-mobile-dropdown" onMouseLeave={handleCloseSubmenu}>
            {NAVIGATION_OPTIONS.map(option => {
              const { props, permissionsRequired } = option;
              const authorized = (permissionsRequired.length === 0) ||
                permissionsRequired.some(permReq => permissions[permReq] == true);
              if (!authorized) return null;
              return (
                <div key={props.name}>
                  <NavOption
                    {...props}
                    active={activeOption === props.name}
                    selectOption={() => handleSelectOption(props)}
                    onSubmenuClick={handleCloseSubmenu}
                  />
                </div>
              );
            })}
            <SidebarFooter />
          </div>
        )}
      </nav>
    </>
  );
};

export default Sidebar;