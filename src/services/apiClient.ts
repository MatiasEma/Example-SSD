import axios from 'axios';
import { getErrorMessage } from '../utils/errorHandler';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(new Error(getErrorMessage(error))),
);
