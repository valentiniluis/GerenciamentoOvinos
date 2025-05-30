import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Login from './pages/Login.jsx';
import CadastroRebanho from './pages/CadastroRebanho.jsx';
import CadastroUsuario from './pages/CadastroUsuario.jsx';
import ListarRebanho from './pages/ListarRebanho.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import CadastroPesagem from './pages/CadastroPesagem.jsx';

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/', element: <h1>Página em desenvolvimento</h1> },
  { path: '/rebanho/cadastrar', element: <CadastroRebanho /> },
  { path: '/rebanho/listar', element: <ListarRebanho /> },
  { path: '/rebanho/pesagem', element: <CadastroPesagem /> },
  { path: '/calendario', element: <h1>Página em desenvolvimento</h1> },
  { path: '/relatorio', element: <h1>Página em desenvolvimento</h1> },
  { path: '/usuario/cadastrar', element: <CadastroUsuario /> },
  { path: '/usuario/listar', element: <h1>Página em desenvolvimento</h1> },
  { path: '/usuario/grupos', element: <h1>Página em desenvolvimento</h1> },
  { path: '*', element: <NotFoundPage /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
