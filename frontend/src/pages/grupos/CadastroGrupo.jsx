import '../../styles/form.css';
import { useState } from 'react';
import PageTitle from '../../components/UI/PageTitle';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import FormCadastroGrupo from '../../components/layout/forms/FormCadastroGrupo';
import ApiAlert from '../../components/UI/ApiAlert';

import api from '../../api/request';

const CadastroGrupo = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccesMsg] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg(null);
    setSuccesMsg(null);

    try {
      const formData = new FormData(event.target);
      const jsonData = Object.fromEntries(formData.entries());
      const postData = { ...jsonData, data_criacao: new Date() };
      const result = await api.post('/grupos', postData);
      console.log(result);

      setSuccesMsg('Grupo cadastrado com sucesso');

      event.target.reset();
    } catch (err) {
      console.log(err)

      if (err.response.data.error) {
        setErrorMsg(err.response.data.error);
      } else {
        setErrorMsg('Erro inesperado. Tente novamente mais tarde');
      }
    }
  }

  return (
    <div className="row m-0">
      <Sidebar user="Emerson" currentPage={'Grupos'} />
      <main className="col cont px-5">
        <PageTitle title="Cadastrar Grupo" />
        <div className="form-cont px-4 flex-center">
          <FormCadastroGrupo onSubmit={handleSubmit} />
        </div>
        <ApiAlert variant="danger" message={errorMsg} onClose={() => setErrorMsg(null)} />
        <ApiAlert variant="success" message={successMsg} onClose={() => setSuccesMsg(null)} />
      </main>
    </div>
  );
};

export default CadastroGrupo;
