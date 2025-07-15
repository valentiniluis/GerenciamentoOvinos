import { redirect } from "react-router-dom"

export const action = () => {
  localStorage.removeItem('SGO_TOKEN');
  localStorage.removeItem('SGO_EXPIRATION');
  return redirect('/entrar');
}

export const loader = () => redirect('/entrar');