import { redirect } from 'react-router-dom';
import '../../styles/auth.css';
import AuthSection from '../../components/layout/auth/AuthSection.jsx';
import { storeAuthToken } from '../../util/auth.js';

import api from '../../api/request.js';


const Autenticacao = () => {
  return (
    <div className="row cont beige">
      <section className="col-xxl-6 col-0 p-0 bg-image-container">
      </section>
      <main className="col p-0 auth-container">
        <AuthSection />
      </main>
    </div>
  );
}

export default Autenticacao;


export const action = async ({ request }) => {
  try {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'login';
    if (mode !== 'login' && mode !== 'signup') throw new Error('Modo inválido');
    const formData = await request.formData();
    const submitData = Object.fromEntries(formData.entries());
    const response = await api.post('/' + mode, submitData);
    const token = response.data.token;
    storeAuthToken(token);
    return redirect('/');
  } catch (err) {
    console.log(err);
    return {
      isError: true,
      message: err.response?.data?.message || 'Falha ao autenticar'
    };
  }
}