// ========================
// Generic API Wrapper
// ========================

/** Every successful response from the server is wrapped in { data: T } */
export interface ApiResponse<T> {
  data: T;
}

/** Error response from the server */
export interface ApiErrorResponse {
  errors: {
    message: string;
    errorCode?: string;
    otherErrors?: string[];
  };
}

// ========================
// Data Models
// ========================

export interface Address {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address_line1: string;
  address_line2?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

export interface User {
  id: string;
  email: string;
}

// ========================
// Auth Types
// ========================

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

/** Raw data inside { data: AuthResponse } */
export interface AuthResponse {
  id: string;
  email: string;
}

/** Raw data inside { data: LoginResponse } */
export interface LoginResponse {
  token: string;
}

// ========================
// Address Types
// ========================

export interface CreateAddressPayload {
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  address_line1: string;
  address_line2?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

export interface UpdateAddressPayload {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

// ========================
// Filter / Pagination
// ========================

export interface FilterParams {
  page?: number;
  limit?: number;
  search?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

/**
 * Actual shape inside the outer { data: FilterApiPayload }
 * Server returns: { data: { data: { addresses: [] }, total: N } }
 * After unwrapping outer `data`:  { data: { addresses: [] }, total: N }
 */
export interface FilterApiPayload {
  data: {
    addresses: Address[];
  };
  total: number;
}

// ========================
// Delete / Export message
// ========================

/**
 * The Go struct has no json tag so JSON key is PascalCase "Message"
 */
export interface MessageResponse {
  Message: string;
}

// ========================
// Export
// ========================

export interface ExportPayload {
  fields: string[];
  email: string;
}

// ========================
// Toast
// ========================

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}
