import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import appRoutes from './router/appRoutes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRoutes} />
  </StrictMode>,
)
