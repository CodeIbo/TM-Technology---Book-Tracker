import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (r) => r,
  (err) => {
    const message = err?.response?.data?.message || err?.message || 'Unexpected API error';
    return Promise.reject(new Error(message));
  },
);
