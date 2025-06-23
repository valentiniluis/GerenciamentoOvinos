import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

const RootLayout = () => {
  return (
    <div className="row m-0">
      <Sidebar user="Luís" currentPage="Calendário" />
      <main className="col cont px-5">
        <Outlet />
      </main>
    </div>
  );
}


export default RootLayout;