import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

import RootLayout from './components/layout/root/RootLayout.jsx';
import CadastroRebanho, { action as submitSheepAction } from './pages/rebanho/CadastroRebanho.jsx';
import ListarRebanho from './pages/rebanho/ListagemRebanho.jsx';
import CadastroPesagem from './pages/rebanho/CadastroPesagem.jsx';
import DadosOvino, { loader as sheepDataLoader } from './pages/rebanho/DadosOvino.jsx';
import CadastroUsuario, { loader as usersLoader } from './pages/usuarios/CadastroUsuario.jsx';
import ListagemUsuarios from './pages/usuarios/ListagemUsuarios.jsx';
import PerfilUsuario from './pages/usuarios/PerfilUsuario.jsx';
import ListagemGrupos from './pages/grupos/ListagemGrupos.jsx';
import CadastroGrupo from './pages/grupos/CadastroGrupo.jsx';
import Relatorio from './pages/relatorio/Relatorio.jsx';
import Calendario from './pages/calendario/Calendario.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Autenticacao from './pages/autenticacao/Autenticacao.jsx';
import PaginaNaoEncontrada from './pages/PaginaNaoEncontrada.jsx';
import EditarOvino, { loader as loadSheep } from './pages/rebanho/EditarOvino.jsx';
import { action as deleteSheepAction } from './pages/rebanho/ExcluirOvino.jsx';


const router = createBrowserRouter([
  { path: '/login', element: <Autenticacao /> },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: '/calendario', element: <Calendario /> },
      {
        path: 'rebanho',
        children: [
          { path: 'cadastrar', element: <CadastroRebanho />, action: submitSheepAction },
          { path: 'listar', element: <ListarRebanho /> },
          { path: 'pesagem', element: <CadastroPesagem /> },
          {
            path: ':brinco',
            children: [
              { index: true, element: <DadosOvino />, loader: sheepDataLoader },
              { path: 'editar', element: <EditarOvino />, loader: loadSheep, action: submitSheepAction },
              { path: 'excluir', action: deleteSheepAction }
            ]
          }
        ]
      },
      {
        path: 'usuario',
        children: [
          { path: 'cadastrar', element: <CadastroUsuario />, loader: usersLoader },
          { path: 'listar', element: <ListagemUsuarios /> },
          { path: ':email', element: <PerfilUsuario /> },
        ]
      },
      {
        path: 'grupo',
        children: [
          { path: 'listar', element: <ListagemGrupos /> },
          { path: 'cadastrar', element: <CadastroGrupo /> },
        ]
      },
      { path: '/relatorio', element: <Relatorio /> },
      { path: '*', element: <PaginaNaoEncontrada /> }
    ]
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App;