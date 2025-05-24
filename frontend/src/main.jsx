import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Login from './pages/Login.jsx';
import CadastroRebanho from './pages/CadastroRebanho.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CadastroRebanho />
  </StrictMode>,
)
