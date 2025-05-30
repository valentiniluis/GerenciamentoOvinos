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
      submenu: [{ name: 'Cadastrar', path: 'cadastrar' }, { name: 'Listar', path: 'listar' }, { name: 'Grupos', path: 'grupos' }],
    }
  ];

  const paginaSelecionada = (name) => {
    setActPage(() => name);
  };

  return (
    <nav className="sidebar">
      <div>
        <SidebarHeader user={user} profilePicture={'./Group_2.png'} />
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
      <SidebarFooter profilePicture={'./Group_2.png'} />
    </nav>
  );
};

export default Sidebar;