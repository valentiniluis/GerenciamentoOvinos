import { redirect } from "react-router-dom"

export const action = () => logout();
export const loader = () => logout();

const logout = () => {
  localStorage.removeItem('SGO_TOKEN');
  localStorage.removeItem('SGO_EXPIRATION');
  return redirect('/entrar');  
}