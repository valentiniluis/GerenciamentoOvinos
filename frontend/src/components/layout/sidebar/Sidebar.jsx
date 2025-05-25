import { useState } from 'react';
import SidebarHeader from './SidebarHeader';
import NavOption from './NavOption';
import SidebarFooter from './SidebarFooter';

const Sidebar = ({ user, group, paginaAtual }) => {
  const [activeOption, setActiveOption] = useState(paginaAtual);

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
    },
  ];

  const paginaSelecionada = (name) => {
    console.log(`DEBUG: Clicado em ${name}`);
    setActiveOption((prev) => (prev = name));
  };

  return (
    <nav className="sidebar">
      <SidebarHeader user={user} profilePicture={'./Group_2.png'} />
      <div className="row">
        <div className="col d-flex justify-content-center">
          <div>
            {optNavegacao.map((option) => (
              <div key={option.name}>
                <NavOption
                  name={option.name}
                  icon={option.icon}
                  active={activeOption === option.name}
                  onClick={() => paginaSelecionada(option.name)}
                />

                {activeOption === option.name && option.submenu && (
                  <div className="ps-4">
                    {option.submenu.map((sub) => (
                      <p key={sub.name} className="submenu-item">
                        {sub.name}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <SidebarFooter profilePicture={'./Group_2.png'} />
    </nav>
  );
};

export default Sidebar;
