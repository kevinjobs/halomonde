import axios, { AxiosRequestConfig } from 'axios';
// import axiosRetry from 'axios-retry';
import { BASE_URL } from '@/configs';

const api = axios.create();

api.defaults.baseURL = BASE_URL;

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
