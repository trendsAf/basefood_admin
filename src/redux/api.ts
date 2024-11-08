// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// console.log(import.meta.env.VITE_BASE_URL);

// export default api;

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import Cookies from "js-cookie";

const API: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  timeout: 50000,
  headers: {},
});

const requestHandler = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const token = Cookies.get("access_token") || "";
  config.headers = config.headers || {};
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

const responseHandler = (response: AxiosResponse): AxiosResponse => response;

const errorHandler = (error: AxiosError): Promise<AxiosError> => {
  if (error.response?.status === 401) {
    //We will handle different error codes here
  }

  return Promise.reject(error);
};

API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => requestHandler(config),
  (error: AxiosError) => errorHandler(error),
);

API.interceptors.response.use(
  (response: AxiosResponse) => responseHandler(response),
  (error: AxiosError) => errorHandler(error),
);

export default API;
