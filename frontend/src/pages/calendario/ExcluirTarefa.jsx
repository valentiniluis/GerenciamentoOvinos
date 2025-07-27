import { redirect } from "react-router-dom";
import api from "../../api/request"


export const action = async ({ request }) => {
  try {
    const searchParams = new URL(request.url).searchParams;
    const title = searchParams.get('title');
    const date = searchParams.get('date');
    const result = await api.delete('/tarefas/' + title + '/' + date);
    return result.data;
  } catch (err) {
    return {
      isError: true,
      message: err.response?.data?.message || 'Falha ao excluir tarefa'
    };
  }
}


export const loader = () => {
  return redirect('/calendario');
}