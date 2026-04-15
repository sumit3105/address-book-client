import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import addressReducer from './addressSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    address: addressReducer,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
