import axios from 'axios';
import { storage } from './storage';

const baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_URL : process.env.VUE_APP_CLIENT_URL;

const config = {
  baseURL,
  withCredentials: true,
  timeout: 5 * 1000,
};

const api = axios.create(config);

api.interceptors.request.use(
  async function (config) {
    const authorization = storage.getAuthorization();
    if (authorization) {
      config.headers.Authorization = authorization;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`/auth/refresh`, { baseURL, withCredentials: true, timeout: 5 * 1000 });
        console.log('🚀 ~ file: api.js ~ line 33 ~ response', response);
        await storage.saveAuthorization(response.data);
        return api.request(originalRequest);
      } catch (e) {
        storage.clearAuthorization();
        console.log('НЕ АВТОРИЗОВАН');
      }
    }
    return Promise.reject(error);
  }
);

export { api };
