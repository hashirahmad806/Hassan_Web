import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import type { ApiResponse, AppointmentFormData } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api';

const config: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

/** Configured Axios instance ready for Express REST endpoints. */
export const apiClient: AxiosInstance = axios.create(config);

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      return Promise.reject(
        new Error(error.response?.data?.message ?? error.message ?? 'Request failed'),
      );
    }
    return Promise.reject(error instanceof Error ? error : new Error('Unknown error'));
  },
);

export const endpoints = {
  appointments: '/appointments',
  contact: '/contact',
  services: '/services',
  gallery: '/gallery',
} as const;

/** Submit appointment booking — stubbed for frontend-only phase. */
export async function submitAppointment(
  data: AppointmentFormData,
): Promise<ApiResponse<{ id: string }>> {
  try {
    const response = await apiClient.post<ApiResponse<{ id: string }>>(
      endpoints.appointments,
      data,
    );
    return response.data;
  } catch {
    // Stub response when backend is unavailable
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      data: { id: `stub-${Date.now()}` },
      message: 'Appointment request received (stub mode)',
    };
  }
}

/** Fetch services list — stubbed. */
export async function fetchServices() {
  try {
    const response = await apiClient.get(endpoints.services);
    return response.data;
  } catch {
    const { treatments } = await import('@/content');
    return { success: true, data: treatments };
  }
}
