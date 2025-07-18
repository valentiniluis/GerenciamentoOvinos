import { redirect } from "react-router-dom";

import api from '../../api/request.js';

export const action = async ({ params }) => {
  const { email } = params;

  try {
    await api.delete('/usuarios/' + email);
    return redirect('/usuario/listar');
  } catch (err) {
    return {
      isError: true,
      message: err.response?.data?.message
    }
  }
}