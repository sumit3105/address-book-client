import axiosInstance from './axiosInstance';
import type {
  Address,
  CreateAddressPayload,
  UpdateAddressPayload,
  FilterParams,
  FilterApiPayload,
  MessageResponse,
  ExportPayload,
  ApiResponse,
} from '@/types';

export const addressApi = {
  /**
   * Create a new address
   * POST /addresses
   * Server returns: { data: { ...address } }
   */
  create: async (payload: CreateAddressPayload): Promise<Address> => {
    const response = await axiosInstance.post<ApiResponse<Address>>('/addresses', payload);
    return response.data.data;
  },

  /**
   * Get all addresses
   * GET /addresses
   * Server returns: { data: { addresses: [...] } }
   */
  getAll: async (): Promise<{ addresses: Address[] }> => {
    const response = await axiosInstance.get<ApiResponse<{ addresses: Address[] }>>('/addresses');
    return response.data.data;
  },

  /**
   * Get address by ID
   * GET /addresses/:id
   * Server returns: { data: { ...address } }
   */
  getById: async (id: string): Promise<Address> => {
    const response = await axiosInstance.get<ApiResponse<Address>>(`/addresses/${id}`);
    return response.data.data;
  },

  /**
   * Update address by ID
   * PUT /addresses/:id
   * Server returns: { data: { ...address } }
   */
  update: async (id: string, payload: UpdateAddressPayload): Promise<Address> => {
    const response = await axiosInstance.put<ApiResponse<Address>>(`/addresses/${id}`, payload);
    return response.data.data;
  },

  /**
   * Delete address by ID
   * DELETE /addresses/:id
   * Server returns: { data: { Message: "..." } }  — PascalCase key from Go struct
   */
  delete: async (id: string): Promise<MessageResponse> => {
    const response = await axiosInstance.delete<ApiResponse<MessageResponse>>(`/addresses/${id}`);
    return response.data.data;
  },

  /**
   * Filter/paginate addresses
   * GET /addresses/filter
   * Server returns: { data: { data: { addresses: [...] }, total: N } }
   */
  filter: async (params: FilterParams): Promise<FilterApiPayload> => {
    const response = await axiosInstance.get<ApiResponse<FilterApiPayload>>('/addresses/filter', { params });
    return response.data.data;
  },

  /**
   * Export addresses as CSV
   * POST /addresses/export
   * Server returns: { data: { Message: "..." } }  — PascalCase key from Go struct
   */
  export: async (payload: ExportPayload): Promise<MessageResponse> => {
    const response = await axiosInstance.post<ApiResponse<MessageResponse>>('/addresses/export', payload);
    return response.data.data;
  },
};
