import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { addressApi } from '@/api/addressApi';
import type {
  Address,
  ApiErrorResponse,
  CreateAddressPayload,
  UpdateAddressPayload,
  FilterParams,
  ExportPayload,
} from '@/types';

// ========================
// State
// ========================

interface AddressState {
  addresses: Address[];
  selectedAddress: Address | null;
  total: number;
  loading: boolean;
  detailLoading: boolean;
  error: string | null;
  filters: FilterParams;
  exportLoading: boolean;
  exportMessage: string | null;
}

const initialState: AddressState = {
  addresses: [],
  selectedAddress: null,
  total: 0,
  loading: false,
  detailLoading: false,
  error: null,
  filters: {
    page: 1,
    limit: 10,
    search: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  },
  exportLoading: false,
  exportMessage: null,
};

// ========================
// Async Thunks
// ========================

export const fetchFilteredAddresses = createAsyncThunk(
  'address/fetchFiltered',
  async (params: FilterParams, { rejectWithValue }) => {
    try {
      const data = await addressApi.filter(params);
      return data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse | undefined;
        return rejectWithValue(data?.errors?.message ?? 'Failed to fetch addresses');
      }
      return rejectWithValue('Failed to fetch addresses');
    }
  }
);

export const fetchAddressById = createAsyncThunk(
  'address/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await addressApi.getById(id);
      return data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse | undefined;
        return rejectWithValue(data?.errors?.message ?? 'Failed to fetch address');
      }
      return rejectWithValue('Failed to fetch address');
    }
  }
);

export const createAddress = createAsyncThunk(
  'address/create',
  async (payload: CreateAddressPayload, { rejectWithValue }) => {
    try {
      const data = await addressApi.create(payload);
      return data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse | undefined;
        return rejectWithValue(data?.errors?.message ?? 'Failed to create address');
      }
      return rejectWithValue('Failed to create address');
    }
  }
);

export const updateAddress = createAsyncThunk(
  'address/update',
  async ({ id, payload }: { id: string; payload: UpdateAddressPayload }, { rejectWithValue }) => {
    try {
      const data = await addressApi.update(id, payload);
      return data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse | undefined;
        return rejectWithValue(data?.errors?.message ?? 'Failed to update address');
      }
      return rejectWithValue('Failed to update address');
    }
  }
);

export const deleteAddress = createAsyncThunk(
  'address/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await addressApi.delete(id);
      return id;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse | undefined;
        return rejectWithValue(data?.errors?.message ?? 'Failed to delete address');
      }
      return rejectWithValue('Failed to delete address');
    }
  }
);

export const exportAddresses = createAsyncThunk(
  'address/export',
  async (payload: ExportPayload, { rejectWithValue }) => {
    try {
      const data = await addressApi.export(payload);
      return data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse | undefined;
        return rejectWithValue(data?.errors?.message ?? 'Failed to export addresses');
      }
      return rejectWithValue('Failed to export addresses');
    }
  }
);

// ========================
// Slice
// ========================

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelectedAddress: (state) => {
      state.selectedAddress = null;
    },
    clearAddressError: (state) => {
      state.error = null;
    },
    clearExportMessage: (state) => {
      state.exportMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch filtered addresses
    builder
      .addCase(fetchFilteredAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredAddresses.fulfilled, (state, action) => {
        state.loading = false;
        // Guard against null/undefined from server on empty results
        state.addresses = action.payload?.data?.addresses ?? [];
        state.total = action.payload?.total ?? 0;
      })
      .addCase(fetchFilteredAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch by ID
    builder
      .addCase(fetchAddressById.pending, (state) => {
        state.detailLoading = true;
      })
      .addCase(fetchAddressById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedAddress = action.payload;
      })
      .addCase(fetchAddressById.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload as string;
      });

    // Create
    builder
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update
    builder
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAddress = action.payload;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete
    builder
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = state.addresses.filter((a) => a.id !== action.payload);
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Export
    builder
      .addCase(exportAddresses.pending, (state) => {
        state.exportLoading = true;
        state.exportMessage = null;
      })
      .addCase(exportAddresses.fulfilled, (state, action) => {
        state.exportLoading = false;
        state.exportMessage = action.payload.Message; // PascalCase from Go struct
      })
      .addCase(exportAddresses.rejected, (state, action) => {
        state.exportLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearSelectedAddress, clearAddressError, clearExportMessage } = addressSlice.actions;
export default addressSlice.reducer;
