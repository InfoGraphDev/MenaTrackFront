import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

export class ApiConfig {
  static addAuthorization(config: AxiosRequestConfig): AxiosRequestConfig {
    config.headers = {
      ...config.headers,
    };

    config.params = {
      ...config.params
    };

    return config;
  }
}

const api = axios.create({
  baseURL: "https://infomapapp.com/menatrack"
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => ApiConfig.addAuthorization(config),
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => Promise.reject(error.response?.data || error)
);

export default api;
