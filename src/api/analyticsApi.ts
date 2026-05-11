import { fetchJson } from './apiClient';

type ApiResponse<T> = { success: boolean; data: T };

export const analyticsApi = {
  getSummary: () => fetchJson<ApiResponse<any>>('/analytics/summary'),
  getProductsPerCategory: () => fetchJson<ApiResponse<any[]>>('/analytics/products-per-category'),
  getTopReviewed: (limit: number) => fetchJson<ApiResponse<any[]>>('/analytics/top-reviewed', { limit }),
  getDiscountDist: () => fetchJson<ApiResponse<any[]>>('/analytics/discount-distribution'),
  getAvgRatingPerCategory: () => fetchJson<ApiResponse<any[]>>('/analytics/avg-rating-per-category'),
};
