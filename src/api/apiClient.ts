import axios, { AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.response.use(
  (response: any) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

type QueryValue = string | number | boolean | undefined;

const cleanParams = (params?: Record<string, QueryValue>) => {
  if (!params) return undefined;
  const clean: Record<string, any> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      clean[key] = value;
    }
  });
  return clean;
};

export async function fetchJson<T>(path: string, params?: Record<string, QueryValue>) {
  const response = await apiClient.get<T>(path, { params: cleanParams(params) });
  return response.data;
}

export async function postMultipart<T>(path: string, formData: FormData) {
  const response = await apiClient.post<T>(path, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}
