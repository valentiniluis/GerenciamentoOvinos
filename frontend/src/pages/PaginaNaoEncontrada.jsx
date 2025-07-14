import { Link } from 'react-router-dom';
import PageTitle from '../components/UI/PageTitle';

const PaginaNaoEncontrada = () => {
  return (
    <>
      <PageTitle title="Página Não Encontrada" />
      <Link to="/">
        <button>Voltar Para Página Principal</button>
      </Link>
    </>
  );
};

export default PaginaNaoEncontrada;
