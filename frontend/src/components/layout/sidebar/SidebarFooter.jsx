import { Link } from 'react-router-dom';

const SidebarFooter = ({ userEmail='admin@admin.com' }) => {
  return (
    <div className="d-flex flex-column align-items-center gap-3 py-3 border-top">
      <Link to={`/usuario/${userEmail}`} className='my-link'>Acessar Meu Perfil</Link>
      <Link to={'/logout'} className='my-link px-2'>Sair</Link>
    </div>
  );
};

export default SidebarFooter;
