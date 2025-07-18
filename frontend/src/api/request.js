import axios from 'axios';
import { getAuthToken } from '../util/auth';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

api.interceptors.request.use(request => {
  const token = getAuthToken();
  if (token) request.headers.Authorization = `Bearer ${token}`;
  return request;
},
  error => Promise.reject(error)
);


export default api;