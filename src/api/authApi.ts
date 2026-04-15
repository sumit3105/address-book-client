import axiosInstance from './axiosInstance';
import type {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
  LoginResponse,
  ApiResponse,
} from '@/types';

export const authApi = {
  /**
   * Register a new user
   * POST /auth/register
   * Server returns: { data: { id, email } }
   */
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/register', payload);
    return response.data.data;
  },

  /**
   * Login user and receive JWT token
   * POST /auth/login
   * Server returns: { data: { token } }
   */
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await axiosInstance.post<ApiResponse<LoginResponse>>('/auth/login', payload);
    return response.data.data;
  },
};
