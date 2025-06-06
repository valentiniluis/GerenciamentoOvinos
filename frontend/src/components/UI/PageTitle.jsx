import '../../index.css'

const PageTitle = ({ title }) => {
  return (
    <div className="row py-5">
      <h1 className="page-title text-center">{title}</h1>
    </div>
  );

}

export default PageTitle;