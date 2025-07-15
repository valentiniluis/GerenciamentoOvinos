import { redirect } from 'react-router-dom';

export const getTokenDuration = () => {
  const storedExpiration = new Date(localStorage.getItem('SGO_EXPIRATION'));
  const now = new Date();
  const remainingTime = storedExpiration.getTime() - now.getTime();
  return remainingTime;
}


export const storeAuthToken = (token, expiration) => {
  const hoursUntilExpire = +expiration.slice(0, expiration.length - 1);
  const expireTime = new Date();
  expireTime.setHours(expireTime.getHours() + hoursUntilExpire);
  localStorage.setItem('SGO_TOKEN', token);
  localStorage.setItem('SGO_EXPIRATION', expireTime.toISOString());
}


export const getAuthToken = () => {
  const token = localStorage.getItem('SGO_TOKEN');
  if (!token) return null;
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) return 'EXPIRED';
  return token;
}


export const checkAuthLoader = () => {
  const token = getAuthToken();
  if (!token) return redirect('/entrar');
  return token;
}