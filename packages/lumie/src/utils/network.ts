import axios, { AxiosRequestConfig } from 'axios';
// import axiosRetry from 'axios-retry';
import { API_URL } from '@/constants';

const api = axios.create();

api.defaults.baseURL = API_URL.base;

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      'content-type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };
    return config;
  }
);

// retry auto, fix the keep-alive problem;
// see: https://zhuanlan.zhihu.com/p/86953757
// 2023-10-25 I use flask for backend now, so delete this
// axiosRetry(api, { retries: 3});

export default api;
