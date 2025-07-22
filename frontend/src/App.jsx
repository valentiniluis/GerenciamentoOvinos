import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

import ListarRebanho from './pages/rebanho/ListagemRebanho.jsx';
import ListagemUsuarios from './pages/usuarios/ListagemUsuarios.jsx';
import ListagemGrupos, { loader as groupsLoader } from './pages/grupos/ListagemGrupos.jsx';
import Relatorio from './pages/relatorio/Relatorio.jsx';
import Calendario from './pages/calendario/Calendario.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import CadastroUsuario, { loader as usersLoader, action as submitUserAction } from './pages/usuarios/CadastroUsuario.jsx';
import PerfilUsuario, { loader as profileLoader, action as profileAction } from './pages/usuarios/PerfilUsuario.jsx';
import RootLayout, { loader as rootLoader } from './components/layout/root/RootLayout.jsx';
import CadastroRebanho, { action as submitSheepAction } from './pages/rebanho/CadastroRebanho.jsx';
import CadastroPesagem, { action as submitWeighInAction } from './pages/rebanho/CadastroPesagem.jsx';
import DadosOvino, { loader as sheepDataLoader } from './pages/rebanho/DadosOvino.jsx';
import CadastroGrupo, { action as submitGroupAction } from './pages/grupos/CadastroGrupo.jsx';
import Autenticacao, { action as authenticateAction } from './pages/autenticacao/Autenticacao.jsx';
import EditarOvino, { loader as loadSheep } from './pages/rebanho/EditarOvino.jsx';
import EditarUsuario, { loader as singleUserLoader } from './pages/usuarios/EditarUsuario.jsx';
import EditarGrupo, { loader as singleGroupLoader } from './pages/grupos/EditarGrupo.jsx';
import { action as deleteSheepAction } from './pages/rebanho/ExcluirOvino.jsx';
import { action as deleteUserAction } from './pages/usuarios/ExcluirUsuario.jsx';
import { action as deleteGroupAction } from './pages/grupos/ExcluirGrupo.jsx';
import { action as deleteWeighInAction } from './pages/rebanho/ExcluirPesagem.jsx';
import { action as logoutAction, loader as logoutLoader } from './pages/autenticacao/Logout.jsx';


const router = createBrowserRouter([
  { path: '/entrar', element: <Autenticacao />, action: authenticateAction },
  {
    path: '',
    element: <RootLayout />,
    loader: rootLoader,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'calendario', element: <Calendario /> },
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
              { path: 'editar', element: <EditarOvino />, loader: loadSheep, action: submitSheepAction },
              { path: 'excluir', action: deleteSheepAction },
              { path: 'pesagem/:data', action: deleteWeighInAction }
            ]
          }
        ]
      },
      {
        path: 'usuario',
        id: 'user',
        loader: usersLoader,
        children: [
          { path: 'cadastrar', element: <CadastroUsuario />, action: submitUserAction },
          { path: 'listar', element: <ListagemUsuarios /> },
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
          { path: 'listar', element: <ListagemGrupos />, loader: groupsLoader },
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
    <RouterProvider router={router} />
  );
}

export default App;