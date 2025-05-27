// import { useState } from 'react';
import SidebarHeader from './SidebarHeader';
import NavOption from './NavOption';
import SidebarFooter from './SidebarFooter';

// Adicionar prop 'group'
const Sidebar = ({ user, currentPage }) => {
  const optNavegacao = [
    {
      name: 'Dashboard',
      icon: './dash_icon.svg',
    },
    {
      name: 'Rebanho',
      icon: './sheep_icon.svg',
      submenu: [{ name: 'Cadastro' }, { name: 'Listar' }, { name: 'Lotes' }],
    },
    {
      name: 'Calendário',
      icon: './calendar.svg',
    },
    {
      name: 'Relatórios',
      icon: './report.svg',
      submenu: [{ name: 'Cadastrados' }, { name: 'SIEM' }],
    },
    {
      name: 'Usuários',
      icon: './people_icon.svg',
      submenu: [{ name: 'Cadastrar' }, { name: 'Listar' }, { name: 'Grupos' }]
    }
  ];

  return (
    <nav className="sidebar">
      <div>
        <SidebarHeader user={user} profilePicture={'./Group_2.png'} />
        <div className="row pt-3 m-0">
          {optNavegacao.map(option => (
            <div className="row w-100 mx-0 px-0">
              <div key={option.name} className={`row justify-content-center w-100 m-0 p-0 ${option.name === currentPage ? 'active' : ''}`}>
                <div className='opt-cont'>
                  <NavOption
                    name={option.name}
                    icon={option.icon}
                    active={currentPage === option.name}
                  />
                </div>
              </div>
              {currentPage === option.name && option.submenu && (
                <div className="submenu text-center">
                  {option.submenu.map((sub) => (
                    <p key={sub.name} className="submenu-item">{sub.name}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <SidebarFooter profilePicture={'./Group_2.png'} />
    </nav>
  );
};


export default Sidebar;
