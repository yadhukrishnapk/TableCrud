// src/services/authService.ts
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useAtom } from 'jotai';
import { authAtom } from '../store/authStore';
import { LoginResponse ,AuthState } from '../types/auth';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('authToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useAuthActions = () => {
  const [, setAuth] = useAtom(authAtom);

  const loginUser = async (
    username: string,
    password: string,
  ): Promise<LoginResponse> => {
    try {
      const response: AxiosResponse<LoginResponse> = await api.post('/auth/login', {
        username,
        password,
      });

      if (response.data.success && response.data.data) {
        localStorage.setItem('authToken', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        setAuth({ token: response.data.data.token, user: response.data.data });
        return response.data;
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as LoginResponse;
      }
      if (error.code === 'ECONNABORTED') {
        return { success: false, message: 'Request timed out. Please try again.' };
      }
      return {
        success: false,
        message: error.message || 'Login failed. Please check your connection and try again.',
      };
    }
  };

  const logoutUser = async (): Promise<void> => {
    try {
      await api.post('/settings/logout');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setAuth({});
    }
  };

  return { loginUser, logoutUser };
};