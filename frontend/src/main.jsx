import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Login from './pages/Login.jsx';
import CadastroRebanho from './pages/CadastroRebanho.jsx';
import ListarRebanho from './pages/ListagemRebanho.jsx';
import CadastroPesagem from './pages/CadastroPesagem.jsx';
import DadosOvino from './pages/DadosOvino.jsx';
import CadastroUsuario from './pages/CadastroUsuario.jsx';
import ListagemUsuarios from './pages/ListagemUsuarios.jsx';
import PerfilUsuario from './pages/PerfilUsuario.jsx';
import ListagemGrupos from './pages/ListagemGrupos.jsx';
import Relatorio from './pages/Relatorio.jsx';
import Calendario from './pages/Calendario.jsx';
import Dashboard from './pages/Dashboard.jsx';
import PaginaNaoEncontrada from './pages/PaginaNaoEncontrada.jsx';

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/', element: <Dashboard /> },
  { path: '/rebanho/cadastrar', element: <CadastroRebanho /> },
  { path: '/rebanho/listar', element: <ListarRebanho /> },
  { path: '/rebanho/pesagem', element: <CadastroPesagem /> },
  { path: '/rebanho/:brinco', element: <DadosOvino /> },
  { path: '/calendario', element:  <Calendario />},
  { path: '/relatorio', element: <Relatorio /> },
  { path: '/usuario/cadastrar', element: <CadastroUsuario /> },
  { path: '/usuario/listar', element: <ListagemUsuarios /> },
  { path: '/usuario/:id', element: <PerfilUsuario /> },
  { path: '/grupo/listar', element: <ListagemGrupos /> },
  { path: '*', element: <PaginaNaoEncontrada /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
