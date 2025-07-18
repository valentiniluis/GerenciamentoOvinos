import { useEffect } from 'react';
import { Outlet, redirect, useLoaderData, useSubmit } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import { PermissionsContext } from '../../../store/permissions-context.jsx';

import { getTokenDuration } from '../../../util/auth';
import api from '../../../api/request.js';


const RootLayout = () => {
  const response = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    const logout = () => submit(null, { action: '/logout', method: 'POST' });

    if (!response.success) return logout();

    const expireTime = getTokenDuration();
    setTimeout(() => {
      // mostrar modal através de ref (?)
      window.alert('Autenticação expirou. Redirecionando para página de login...');
      logout();
    }, expireTime);
  }, [response, submit]);

  const { nome, email } = response.data;
  const permissoes = Object.fromEntries(
    Object.entries(response.data).filter(perm => perm[0].startsWith('perm'))
  );

  return (
    <PermissionsContext value={permissoes}>
      <div className="row m-0">
        <Sidebar user={nome} email={email} />
        <main className="col cont px-5">
          <Outlet />
        </main>
      </div>
    </PermissionsContext>
  );
}


export default RootLayout;


export const loader = async () => {
  try {
    const result = await api.get('/permissoes');
    return result.data;
  } catch (err) {
    window.alert(err.response?.data?.message || 'Falha ao carregar permissões do usuário');
    return redirect('/entrar');
  }
}