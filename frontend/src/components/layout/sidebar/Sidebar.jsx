import '../../../styles/sidebar.css';

import menuIcon from '/menu_hamburger.svg';
import { useState } from 'react';
import SidebarHeader from './SidebarHeader';
import NavOption from './NavOption';
import SidebarFooter from './SidebarFooter';

import dashboardIcon from '/dashboard.svg';
import sheepIcon from '/sheep_icon.svg';
import calendarIcon from '/calendar.svg';
import reportIcon from '/report.svg';
import usersIcon from '/users.svg';

// Adicionar prop 'group'
const Sidebar = ({ user, currentPage }) => {
  const [actPage, setActPage] = useState(currentPage);
  const [menuOpen, setMenuOpen] = useState(false);

  const optNavegacao = [
    {
      name: 'Dashboard',
      icon: dashboardIcon,
      path: '/'
    },
    {
      name: 'Rebanho',
      icon: sheepIcon,
      basepath: '/rebanho',
      submenu: [{ name: 'Cadastrar', path: 'cadastrar' }, { name: 'Listar', path: 'listar' }, { name: 'Cadastrar Pesagem', path: 'pesagem' }]
    },
    {
      name: 'Calendário',
      icon: calendarIcon,
      path: '/calendario'
    },
    {
      name: 'Relatório',
      icon: reportIcon,
      path: '/relatorio'
    },
    {
      name: 'Usuários',
      icon: usersIcon,
      basepath: '/usuario',
      submenu: [{ name: 'Cadastrar', path: 'cadastrar' }, { name: 'Listar', path: 'listar' }],
    },
    {
      name: 'Grupos',
      icon: usersIcon,
      basepath: '/grupo',
      submenu: [{ name: 'Cadastrar', path: 'cadastrar' }, { name: 'Listar', path: 'listar' }]
    }
  ];

  const paginaSelecionada = (name) => {
    setActPage(() => name);
    setMenuOpen(false); 
  };

  const handleMobileOptionClick = (option) => {
    setActPage(option.name);
    if (!option.submenu) setMenuOpen(false);
  };

  const handleMobileSubmenuClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="sidebar d-none d-md-flex">
        {/* Sidebar padrão para telas médias/grandes */}
        <div>
          <SidebarHeader user={user} profilePicture={'/Group_2.png'} />
          <div className="row pt-3 m-0">
            {optNavegacao.map((option) => (
              <NavOption
                key={option.name}
                name={option.name}
                icon={option.icon}
                path={option.path ?? option.basepath}
                active={actPage === option.name}
                callback={() => paginaSelecionada(option.name)}
                submenu={option.submenu}
              />
            ))}
          </div>
        </div>
        <SidebarFooter profilePicture={'/Group_2.png'} />
      </nav>

      {/* Navbar responsivo para telas pequenas */}
      <nav className="navbar-mobile d-flex d-md-none align-items-center justify-content-between px-3 py-2">
        <img src={menuIcon} alt="Abrir menu" className="menu-icon" onClick={() => setMenuOpen(!menuOpen)} />
        <span className="navbar-mobile-title">Menu</span>
        <img
          className="profile-picture-two"
          src={'/Group_2.png'}
          alt="Foto de Perfil do Usuário"
        />
        {menuOpen && (
          <div className="navbar-mobile-dropdown">
            {optNavegacao.map((option) => (
              <div key={option.name}>
                <NavOption
                  name={option.name}
                  icon={option.icon}
                  path={option.path ?? option.basepath}
                  active={actPage === option.name}
                  callback={() => handleMobileOptionClick(option)}
                  submenu={option.submenu}
                  onSubmenuClick={handleMobileSubmenuClick}
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