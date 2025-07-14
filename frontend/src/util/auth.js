
export const storeAuthToken = (token) => {
  localStorage.setItem('SGO_TOKEN', token);
}

export const getAuthToken = () => {
  return localStorage.getItem('SGO_TOKEN');
}