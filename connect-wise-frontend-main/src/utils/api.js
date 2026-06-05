import axios from 'axios';
import { decodeJWT, getTokenCookie } from './helpers';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getTokenCookie();
  const decode = decodeJWT(token);
  const isExpire = decode && Date.now() >= decode.exp * 1000;
  if (token && !isExpire) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
