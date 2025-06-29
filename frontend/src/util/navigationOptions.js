import dashboardIcon from '/dashboard.svg';
import sheepIcon from '/sheep_icon.svg';
import calendarIcon from '/calendar.svg';
import reportIcon from '/report.svg';
import userIcon from '/user.svg';
import groupIcon from '/group.svg';


const NAVIGATION_OPTIONS = [
  {
    name: 'Dashboard',
    icon: dashboardIcon,
    path: '/'
  },
  {
    name: 'Rebanho',
    icon: sheepIcon,
    path: '/rebanho',
    submenu: [
      { name: 'Cadastrar', subpath: 'cadastrar' },
      { name: 'Listar', subpath: 'listar' },
      { name: 'Cadastrar Pesagem', subpath: 'pesagem' }
    ]
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
    icon: userIcon,
    path: '/usuario',
    submenu: [
      { name: 'Cadastrar', subpath: 'cadastrar' },
      { name: 'Listar', subpath: 'listar' }
    ]
  },
  {
    name: 'Grupos',
    icon: groupIcon,
    path: '/grupo',
    submenu: [
      { name: 'Cadastrar', subpath: 'cadastrar' },
      { name: 'Listar', subpath: 'listar' }
    ]
  }
];


export default NAVIGATION_OPTIONS