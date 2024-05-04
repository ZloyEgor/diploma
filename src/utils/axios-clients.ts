import { createAxiosClient } from '../config/axios-constructor.ts';

export const axiosClient = createAxiosClient({
  baseURL: `${import.meta.env.VITE_BASE_URL}/manager`,
  headers: { 'Content-Type': 'text/plain' },
});
