import { redirect } from "react-router-dom";

import api from '../../api/request.js';

export const action = async ({ params }) => {
  const { nome } = params;

  try {
    await api.delete('/grupos/' + nome);
    return redirect('/grupo/listar');
  } catch (err) {
    return {
      isError: true,
      message: err.response?.data?.message || 'Falha ao excluir grupo'
    }
  }
}