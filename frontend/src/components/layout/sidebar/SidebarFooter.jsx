import { Link, useSubmit } from 'react-router-dom';

const SidebarFooter = ({ userEmail='admin@admin.com' }) => {
  const submit = useSubmit();

  const handleLogout = () => submit(null, { action: '/logout', method: 'POST' });

  return (
    <div className="d-flex flex-column align-items-center gap-3 py-3 border-top">
      <Link to={`/usuario/${userEmail}`} className='my-link'>Acessar Meu Perfil</Link>
      <button type="button" className='my-link no-decoration-btn px-2' onClick={handleLogout}>Sair</button>
    </div>
  );
};

export default SidebarFooter;
