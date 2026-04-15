import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { ToastMessage, ToastType } from '@/types';
import {
  ToastContainer,
  ToastItem,
  ToastIcon,
  ToastContent,
  ToastText,
  ToastClose,
} from './Toast.styles';

// ========================
// Context
// ========================

interface ToastContextValue {
  showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

// ========================
// Provider
// ========================

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 6);
    setToasts((prev) => [...prev, { id, type, message }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} $type={toast.type}>
            <ToastIcon $type={toast.type} />
            <ToastContent>
              <ToastText>{toast.message}</ToastText>
            </ToastContent>
            <ToastClose onClick={() => removeToast(toast.id)} aria-label="Dismiss">
              ✕
            </ToastClose>
          </ToastItem>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};
