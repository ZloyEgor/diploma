import axios, { AxiosRequestConfig } from 'axios';

export const createAxiosClient = (config?: AxiosRequestConfig) => {
  return axios.create(config);
};
