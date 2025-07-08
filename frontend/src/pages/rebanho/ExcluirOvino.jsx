import { redirect } from "react-router-dom";

import api from '../../api/request.js';

export const action = async ({ params }) => {
  const { brinco } = params;

  try {
    await api.delete('/rebanho/' + brinco);
    return redirect('/rebanho/listar');
  } catch (err) {
    return {
      isError: true,
      message: err.response?.data?.message
    }
  }
}