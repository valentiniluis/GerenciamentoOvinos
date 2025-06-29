import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

import RootLayout from './components/layout/root/RootLayout.jsx';
import CadastroRebanho from './pages/rebanho/CadastroRebanho.jsx';
import ListarRebanho from './pages/rebanho/ListagemRebanho.jsx';
import CadastroPesagem from './pages/rebanho/CadastroPesagem.jsx';
import DadosOvino, { loader as sheepDataLoader } from './pages/rebanho/DadosOvino.jsx';
import CadastroUsuario, { loader as UsersLoader } from './pages/usuarios/CadastroUsuario.jsx';
import ListagemUsuarios from './pages/usuarios/ListagemUsuarios.jsx';
import PerfilUsuario from './pages/usuarios/PerfilUsuario.jsx';
import ListagemGrupos from './pages/grupos/ListagemGrupos.jsx';
import CadastroGrupo from './pages/grupos/CadastroGrupo.jsx';
import Relatorio from './pages/relatorio/Relatorio.jsx';
import Calendario from './pages/calendario/Calendario.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Autenticacao from './pages/autenticacao/Autenticacao.jsx';
import PaginaNaoEncontrada from './pages/PaginaNaoEncontrada.jsx';

const router = createBrowserRouter([
  { path: '/login', element: <Autenticacao /> },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: '/calendario', element: <Calendario /> },
      { path: '/rebanho/cadastrar', element: <CadastroRebanho /> },
      { path: '/rebanho/listar', element: <ListarRebanho /> },
      { path: '/rebanho/pesagem', element: <CadastroPesagem /> },
      { path: '/rebanho/:brinco', element: <DadosOvino />, loader: sheepDataLoader },
      { path: '/relatorio', element: <Relatorio /> },
      { path: '/usuario/cadastrar', element: <CadastroUsuario />, loader: UsersLoader},
      { path: '/usuario/listar', element: <ListagemUsuarios /> },
      { path: '/usuario/:email', element: <PerfilUsuario /> },
      { path: '/grupo/listar', element: <ListagemGrupos /> },
      { path: '/grupo/cadastrar', element: <CadastroGrupo /> },
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