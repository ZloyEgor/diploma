import axios, { AxiosRequestConfig } from 'axios';
export const createAxiosClient = (config?: AxiosRequestConfig) => {
  const client = axios.create(config);
  return client;
};
