import api from '../../api/request.js';


export const action = async ({ params }) => {
  const { brinco, data } = params;

  try {
    const response = await api.delete(`/rebanho/${brinco}/pesagem/${data}`);
    return response.data;
  } catch (err) {
    return {
      isError: true,
      message: err.response.data.message || 'Falha ao excluir pesagem'
    };
  }
}