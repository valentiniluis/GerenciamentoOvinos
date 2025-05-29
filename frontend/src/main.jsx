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

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/rebanho/listar', element: <ListarRebanho /> },
  { path: '/rebanho/cadastrar', element: <CadastroRebanho /> },
  { path: '/usuario/cadastrar', element: <CadastroUsuario /> },
  { path: '*', element: <NotFoundPage /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
