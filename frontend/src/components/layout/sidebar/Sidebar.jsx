import SidebarHeader from './SidebarHeader';
import NavOption from './NavOption';
import SidebarFooter from './SidebarFooter';

const Sidebar = ({ user, group, onNavigate }) => {

  const optNavegacao = [
    { name: 'Dashboard', icon: './dash_icon.svg' },
    { name: 'Rebanho', icon: './sheep_icon.svg' },
    { name: 'Calendário', icon: './calendar.svg' },
    { name: 'Relatórios', icon: './report.svg' },
    { name: 'Usuários', icon: './people_icon.svg' },
  ];

  return (
    <nav className="sidebar">
      <SidebarHeader user={user} profilePicture={"./Group_2.png"} />
      <div className="row">
        <div className="col d-flex justify-content-center">
          <div>
            { optNavegacao.map((option) => (
              <NavOption
                key={option.name}
                name={option.name}
                icon={option.icon}
              />
            ))}
          </div>
        </div>
      </div>
      <SidebarFooter profilePicture={'./Group_2.png'} />
    </nav>
  );
};

export default Sidebar;
