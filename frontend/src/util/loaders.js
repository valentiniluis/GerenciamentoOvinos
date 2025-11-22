import api from '../api/request';


export const getFilteredList = async ({ queryKey }) => {
  const base = queryKey[0];
  const { page } = queryKey[1];
  // filter properties
  const { attribute, value } = queryKey[2];
  const hasFilterSet = (attribute !== 'nenhuma' && value);
  let url = `/${base}?page=${page}`;
  if (hasFilterSet) url += `&${attribute}=${value}`;
  const response = await api.get(url);
  const data = response.data;
  return data;
}


export const getGroups = async () => {
  const url = '/grupos?page=1&limit=100000';
  const response = await api.get(url);
  return response.data;
}