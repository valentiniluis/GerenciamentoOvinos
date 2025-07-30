import api from '../../api/request.js';

export const action = async ({ params }) => {
  const { brinco } = params;

  try {
    const response = await api.delete('/rebanho/' + brinco);
    return response.data;
  } catch (err) {
    return {
      isError: true,
      message: err.response?.data?.message || 'Falha ao excluir ovino'
    }
  }
}