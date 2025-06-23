import '../../index.css'

const PageTitle = ({ title }) => {
  return (
    <header className="row py-5">
      <h1 className="page-title text-center">{title}</h1>
    </header>
  );

}

export default PageTitle;