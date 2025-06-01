import Sidebar from "../components/layout/sidebar/Sidebar";
import PageTitle from "../components/UI/PageTitle";

const Dashboard = () => {
  return (
    <div className="row m-0">
      <Sidebar user="Luís" currentPage="Dashboard" />
      <main className="col cont px-5">
        <PageTitle title="Dashboard"/>
        <h1>Aqui será feito a magia</h1>
      </main>
    </div>
  );
};

export default Dashboard;
