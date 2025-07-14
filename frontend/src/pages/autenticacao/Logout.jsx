import { redirect } from "react-router-dom"

export const action = () => {
  localStorage.removeItem('SGO_TOKEN');
  return redirect('/entrar');
}

export const loader = () => {
  return redirect('/entrar');
}