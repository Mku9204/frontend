import { fetchJson, postMultipart } from './apiClient';

type ApiResponse<T> = { success: boolean; data: T; pagination?: any };

type QueryValue = string | number | boolean | undefined;

export const productsApi = {
  getAll: (params?: Record<string, QueryValue>) =>
    fetchJson<ApiResponse<any[]>>('/products', params),
  getCategories: () => fetchJson<ApiResponse<string[]>>('/products/categories'),
  importFile: (formData: FormData) => postMultipart<ApiResponse<any>>('/products/import', formData),
};
