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
    <nav className="cont bg-white">
      <SidebarHeader user={user} profilePicture="./Group_2.png" />
      <div className="row">
        <div className="col-5"></div>
        <div className="col">
          { optNavegacao.map((option) => (
            <NavOption
              key={option.name}
              name={option.name}
              icon={option.icon}
            />
          ))};
        </div>
      </div>
      <SidebarFooter profilePicture={'./Group_2.png'} />
    </nav>
  );
};

export default Sidebar;
