import { useState } from 'react';
import SidebarHeader from './SidebarHeader';
import NavOption from './NavOption';
import SidebarFooter from './SidebarFooter';

// Adicionar prop 'group'
const Sidebar = ({ user, currentPage }) => {
  const [ actPage, setActPage ] = useState(currentPage);

  const optNavegacao = [
    {
      name: 'Dashboard',
      icon: './dash_icon.svg',
    },
    {
      name: 'Rebanho',
      icon: './sheep_icon.svg',
      submenu: [{ name: 'Cadastro' }, { name: 'Listar' }, { name: 'Pesagem' }]
    },
    {
      name: 'Calendário',
      icon: './calendar.svg'
    },
    {
      name: 'Relatórios',
      icon: './report.svg',
      submenu: [{ name: 'Cadastrados' }, { name: 'SIEM' }]
    },
    {
      name: 'Usuários',
      icon: './people_icon.svg',
      submenu: [{ name: 'Cadastrar' }, { name: 'Listar' }, { name: 'Grupos' }]
    }
  ];

  const paginaSelecionada = (name) => {
    console.log(`DEBUG: Clicado em ${name}`);
    setActPage((prev) => (prev === name? null: name));
  };

  return (
    <nav className="sidebar">
      <div>
        <SidebarHeader user={user} profilePicture={'./Group_2.png'} />
        <div className="row pt-3 m-0">
          {optNavegacao.map(option => (
            <div className="row w-100 mx-0 px-0" key={option.name}>
              <div  className={`row justify-content-center w-100 m-0 p-0 ${option.name === actPage ? 'active' : null}`}>
                <div className='opt-cont'>
                  <NavOption
                    name={option.name}
                    icon={option.icon}
                    active={currentPage === option.name}
                    callback={() => paginaSelecionada(option.name)}
                  />
                </div>
              </div>
              {actPage === option.name && option.submenu && (
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
