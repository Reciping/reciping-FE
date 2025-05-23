import { AxiosInstance } from 'axios';

export const addTokenInterceptor = (client: AxiosInstance) => {
  client.interceptors.request.use(
    (config) => {
      let token = localStorage.getItem('token');
      if (token) {
        token = token.trim();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}; 