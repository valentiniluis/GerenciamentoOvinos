import dashboardIcon from '/dashboard.svg';
import sheepIcon from '/sheep_icon.svg';
import calendarIcon from '/calendar.svg';
import reportIcon from '/report.svg';
import userIcon from '/user.svg';
import groupIcon from '/group.svg';


const NAVIGATION_OPTIONS = [
  {
    permissionsRequired: [],
    props: {
      name: 'Início',
      icon: dashboardIcon,
      path: '/'
    }
  },
  {
    permissionsRequired: ['perm_visual_rebanho', 'perm_alter_rebanho'],
    props: {
      name: 'Rebanho',
      icon: sheepIcon,
      path: '/rebanho',
      submenu: [
        { name: 'Cadastrar', subpath: 'cadastrar', permissionRequired: 'perm_alter_rebanho' },
        { name: 'Listar', subpath: 'listar', permissionRequired: 'perm_visual_rebanho' },
        { name: 'Cadastrar Pesagem', subpath: 'pesagem', permissionRequired: 'perm_alter_rebanho' }
      ]
    }
  },
  {
    permissionsRequired: ['perm_visual_calendario', 'perm_alter_calendario'],
    props: {
      name: 'Calendário',
      icon: calendarIcon,
      path: '/calendario'
    }
  },
  {
    permissionsRequired: [],
    props: {
      name: 'Relatório',
      icon: reportIcon,
      path: '/relatorio'
    }
  },
  {
    permissionsRequired: ['perm_visual_grupos', 'perm_alter_usuario_grupo'],
    props: {
      name: 'Usuários',
      icon: userIcon,
      path: '/usuario',
      submenu: [
        { name: 'Cadastrar', subpath: 'cadastrar', permissionRequired: 'perm_alter_usuario_grupo' },
        { name: 'Listar', subpath: 'listar', permissionRequired: 'perm_visual_grupos' }
      ]
    }
  },
  {
    permissionsRequired: ['perm_visual_grupos', 'perm_alter_usuario_grupo'],
    props: {
      name: 'Grupos',
      icon: groupIcon,
      path: '/grupo',
      submenu: [
        { name: 'Cadastrar', subpath: 'cadastrar', permissionRequired: 'perm_alter_usuario_grupo' },
        { name: 'Listar', subpath: 'listar', permissionRequired: 'perm_visual_grupos' }
      ]
    }
  }
];


export default NAVIGATION_OPTIONS