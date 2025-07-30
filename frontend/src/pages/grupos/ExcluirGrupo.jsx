import api from '../../api/request.js';

export const action = async ({ params }) => {
  const { nome } = params;

  try {
    const response = await api.delete('/grupos/' + nome);
    return response.data;
  } catch (err) {
    return {
      isError: true,
      message: err.response?.data?.message || 'Falha ao excluir grupo'
    }
  }
}