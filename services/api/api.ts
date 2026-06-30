// services/api.ts

import { BEST_USER_TOKEN } from "@/constant/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    // attach token here
    const token = await AsyncStorage.getItem(BEST_USER_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    return Promise.reject({
      message:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",

      status: error.response?.status,

      data: error.response?.data,
    });
  },
);

export async function GET<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response: AxiosResponse<T> = await api.get(url, config);

  return response.data;
}

export async function POST<T, D = unknown>(
  url: string,
  body?: D,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response: AxiosResponse<T> = await api.post(url, body, config);

  return response.data;
}

export async function PUT<T, D = unknown>(
  url: string,
  body?: D,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response: AxiosResponse<T> = await api.put(url, body, config);

  return response.data;
}

export async function DELETE<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response: AxiosResponse<T> = await api.delete(url, config);

  return response.data;
}
