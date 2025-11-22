import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './util/queryClient.js';

import Relatorio from './pages/relatorio/Relatorio.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

const ListarRebanho = lazy(() => import('./pages/rebanho/ListagemRebanho.jsx'));
const ListarGrupos = lazy(() => import('./pages/grupos/ListagemGrupos.jsx'));
const ListarUsuarios = lazy(() => import('./pages/usuarios/ListagemUsuarios.jsx'));

import RootLayout, { loader as rootLoader } from './components/layout/root/RootLayout.jsx';
import DadosOvino, { loader as sheepDataLoader } from './pages/rebanho/DadosOvino.jsx';
import EditarOvino, { loader as singleSheepLoader } from './pages/rebanho/EditarOvino.jsx';
import EditarUsuario, { loader as singleUserLoader } from './pages/usuarios/EditarUsuario.jsx';
import EditarGrupo, { loader as singleGroupLoader } from './pages/grupos/EditarGrupo.jsx';
import CadastroGrupo, { action as submitGroupAction } from './pages/grupos/CadastroGrupo.jsx';
import Autenticacao, { action as authenticateAction } from './pages/autenticacao/Autenticacao.jsx';
import CadastroRebanho, { action as submitSheepAction } from './pages/rebanho/CadastroRebanho.jsx';
import CadastroPesagem, { action as submitWeighInAction } from './pages/rebanho/CadastroPesagem.jsx';
import { action as deleteTaskAction, loader as deleteTaskLoader } from './pages/calendario/ExcluirTarefa.jsx';
import { action as deleteSheepAction } from './pages/rebanho/ExcluirOvino.jsx';
import { action as deleteUserAction } from './pages/usuarios/ExcluirUsuario.jsx';
import { action as deleteGroupAction } from './pages/grupos/ExcluirGrupo.jsx';
import { action as deleteWeighInAction } from './pages/rebanho/ExcluirPesagem.jsx';
import { action as logoutAction, loader as logoutLoader } from './pages/autenticacao/Logout.jsx';
import Calendario, { loader as tasksLoader, action as tasksAction } from './pages/calendario/Calendario.jsx';
import CadastroUsuario, { action as submitUserAction } from './pages/usuarios/CadastroUsuario.jsx';
import PerfilUsuario, { loader as profileLoader, action as profileAction } from './pages/usuarios/PerfilUsuario.jsx';


const router = createBrowserRouter([
  { path: '/entrar', element: <Autenticacao />, action: authenticateAction },
  {
    path: '',
    element: <RootLayout />,
    loader: rootLoader,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: 'rebanho',
        children: [
          { path: 'cadastrar', element: <CadastroRebanho />, action: submitSheepAction },
          { path: 'listar', element: <ListarRebanho /> },
          { path: 'pesagem', element: <CadastroPesagem />, action: submitWeighInAction },
          {
            path: ':brinco',
            children: [
              { index: true, element: <DadosOvino />, loader: sheepDataLoader },
              { path: 'editar', element: <EditarOvino />, loader: singleSheepLoader, action: submitSheepAction },
              { path: 'excluir', action: deleteSheepAction },
              { path: 'pesagem/:data', action: deleteWeighInAction }
            ]
          }
        ]
      },
      {
        path: 'calendario',
        element: <Calendario />,
        loader: tasksLoader,
        action: tasksAction,
        children: [
          { path: 'excluir', action: deleteTaskAction, loader: deleteTaskLoader }
        ]
      },
      {
        path: 'usuario',
        children: [
          { path: 'cadastrar', element: <CadastroUsuario />, action: submitUserAction },
          { path: 'listar', element: <ListarUsuarios /> },
          {
            path: ':email',
            children: [
              { index: true, element: <EditarUsuario />, action: submitUserAction, loader: singleUserLoader },
              { path: 'excluir', action: deleteUserAction }
            ]
          },
        ]
      },
      {
        path: 'grupo',
        children: [
          { path: 'listar', element: <ListarGrupos /> },
          { path: 'cadastrar', element: <CadastroGrupo />, action: submitGroupAction },
          {
            path: ':nome',
            children: [
              { index: true, element: <EditarGrupo />, action: submitGroupAction, loader: singleGroupLoader },
              { path: 'excluir', action: deleteGroupAction }
            ]
          }
        ]
      },
      { path: 'perfil', element: <PerfilUsuario />, loader: profileLoader, action: profileAction },
      { path: 'relatorio', element: <Relatorio /> },
      { path: 'logout', action: logoutAction, loader: logoutLoader },
      { path: '*', element: <ErrorPage title="Página não encontrada" /> }
    ]
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;