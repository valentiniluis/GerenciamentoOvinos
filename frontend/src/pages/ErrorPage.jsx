import { Link } from 'react-router-dom';
import PageTitle from '../components/UI/PageTitle';

const ErrorPage = ({ title }) => {
  return (
    <>
      <PageTitle title={title} />
      <section className="w-100 flex-center">
        <Link to="/" className='my-link'>
          Voltar Para Página Principal
        </Link>
      </section>
    </>
  );
};

export default ErrorPage;
