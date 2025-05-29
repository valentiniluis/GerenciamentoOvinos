import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <h1>Página Não Encontrada</h1>
      <Link to={'/login'}>
        <button>Voltar Para Página Principal</button>
      </Link>
    </div>
  );
}

export default NotFoundPage;