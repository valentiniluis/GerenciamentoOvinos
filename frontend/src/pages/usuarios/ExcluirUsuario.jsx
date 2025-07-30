import api from '../../api/request.js';

export const action = async ({ params }) => {
  const { email } = params;

  try {
    const response = await api.delete('/usuarios/' + email);
    return response.data;
  } catch (err) {
    return {
      isError: true,
      message: err.response?.data?.message || 'Falha ao excluir usuário'
    }
  }
}