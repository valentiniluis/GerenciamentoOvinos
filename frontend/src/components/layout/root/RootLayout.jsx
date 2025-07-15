import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

import { getTokenDuration } from '../../../util/auth';


const RootLayout = () => {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    function logout() {
      submit(null, { action: '/logout', method: 'POST' });
    }

    if (!token) return;
    if (token === 'EXPIRED') return logout();

    const expireTime = getTokenDuration();
    setTimeout(() => {
      // mostrar modal através de ref (?)
      window.alert('Autenticação expirou. Redirecionando para página de login...');
      logout();
    }, expireTime);
  }, [token, submit]);

  return (
    <div className="row m-0">
      <Sidebar user="Luís" />
      <main className="col cont px-5">
        <Outlet />
      </main>
    </div>
  );
}


export default RootLayout;