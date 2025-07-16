import { Link } from 'react-router-dom';
import PageTitle from '../components/UI/PageTitle';
import FormBtn from '../components/UI/FormBtn';

const ErrorPage = ({ title }) => {
  return (
    <>
      <PageTitle title={title} />
      <section className="w-100 flex-center">
        <Link to="/">
          <FormBtn text="Voltar Para Página Principal" />
        </Link>
      </section>
    </>
  );
};

export default ErrorPage;
