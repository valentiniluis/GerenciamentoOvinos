import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../../styles/sidebar.css';

import SidebarHeader from './SidebarHeader.jsx';
import NavOption from './NavOption.jsx';
import SidebarFooter from './SidebarFooter.jsx';
import menuIcon from '/menu_hamburger.svg';
import NAVIGATION_OPTIONS from '../../../util/navigationOptions.js';


const Sidebar = ({ user }) => {
  const location = useLocation();
  const path = location.pathname;
  const currentPage = NAVIGATION_OPTIONS.find(navOption => {
    return (navOption.path === path) || (navOption.path !== '/' && path.startsWith(navOption.path));
  });

  const [activeOption, setActiveOption] = useState(currentPage.name);
  const [menuOpen, setMenuOpen] = useState(false);

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
          <SidebarHeader user={user} profilePicture={'/Group_2.png'} />
          <div id="nav-options-container" className="row pt-3 m-0">
            {NAVIGATION_OPTIONS.map((option) => (
              <NavOption
                key={option.name}
                active={activeOption === option.name}
                selectOption={() => handleSelectOption(option)}
                {...option}
              />
            ))}
          </div>
        </div>
        <SidebarFooter profilePicture={'/Group_2.png'} />
      </nav>

      {/* Navbar responsivo para telas pequenas */}
      <nav className="navbar-mobile d-flex d-md-none align-items-center justify-content-between px-3 py-2">
        <img src={menuIcon} alt="Abrir menu" className="menu-icon" onClick={() => setMenuOpen(prevOpen => !prevOpen)} />
        <span className="navbar-mobile-title">Menu</span>
        <img
          className="profile-picture-two"
          src={'/Group_2.png'}
          alt="Foto de Perfil do Usuário"
        />
        {menuOpen && (
          <div className="navbar-mobile-dropdown">
            {NAVIGATION_OPTIONS.map((option) => (
              <div key={option.name}>
                <NavOption
                  {...option}
                  active={activeOption === option.name}
                  selectOption={() => handleSelectOption(option)}
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