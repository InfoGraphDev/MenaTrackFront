import { LocalStorageEnum } from "@/Core/Enums/LocalStorage";
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { AuthService } from "../ApiService/URL/Auth.Service";
import { PagesEnum } from "@/Core/Enums/PagesEnum";

export const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export class ApiConfig {
  static addAuthorization(config: AxiosRequestConfig): AxiosRequestConfig {
    config.headers = {
      ...config.headers,
      "Accept-Language":JSON.parse(window.localStorage.getItem(LocalStorageEnum[100]))?.language || 'ar',
      'Authorization': window.localStorage?.[LocalStorageEnum[5]] 
      ? `Bearer ${JSON.parse(window.localStorage?.[LocalStorageEnum[5]])?.accessToken}` 
      : ""
    };
    return config;
  }
}

const api = axios.create({
  baseURL: BACKEND_ENDPOINT,
  withCredentials: true
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const refreshToken = async () => {
  try {
    const storageItem = window.localStorage?.[LocalStorageEnum[5]] || '{}';
    const existingData = JSON.parse(storageItem);
    const  refreshToken  = existingData?.refreshToken;

    const response = await axios.get(`${BACKEND_ENDPOINT}/${AuthService.RefreshTokenGenerator}`,{
      params:{refreshToken:refreshToken}
    });

    const updatedData = {
      ...existingData,
      accessToken:response?.data?.data?.accessToken?.newAccessToken,
      refreshToken: response?.data?.data?.accessToken?.newRefreshToken
    };

    window.localStorage.setItem(LocalStorageEnum[5], JSON.stringify(updatedData));
    return response?.data?.data?.accessToken?.newAccessToken;
  } catch (error) {
    window.localStorage.removeItem(LocalStorageEnum[5]);
    window.location.href = `/TRC/${PagesEnum[0]}`;
  }
};

api.interceptors.request.use((config: AxiosRequestConfig) => {
  return ApiConfig.addAuthorization(config);
}, (error: AxiosError) => Promise.reject(error));

api.interceptors.response.use((response: AxiosResponse) => response, async (error: AxiosError) => {
  const originalRequest:any = error.config;
  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return axios(originalRequest);
      }).catch(err => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const newToken = await refreshToken();
      processQueue(null, newToken);
      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
      return axios(originalRequest);
    } catch (err) {
      processQueue(err, null);
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
  if (error.response && error.response.status === 401) {
    window.localStorage.removeItem(LocalStorageEnum[5]);  
    window.location.href = `/${PagesEnum[0]}`;  
  }


  return Promise.reject(error?.response?.data);
});

export default api;
