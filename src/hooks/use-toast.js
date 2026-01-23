import { useState, useCallback } from 'react';

// Simple toast implementation
const toastState = {
  toasts: [],
  listeners: new Set(),
};

export const useToast = () => {
  const [, forceUpdate] = useState(0);

  const toast = useCallback(({ title, description, variant = 'default' }) => {
    const id = Date.now() + Math.random();
    const newToast = { id, title, description, variant };
    
    toastState.toasts.push(newToast);
    toastState.listeners.forEach(listener => listener());

    // Auto-remove after 5 seconds
    setTimeout(() => {
      toastState.toasts = toastState.toasts.filter(t => t.id !== id);
      toastState.listeners.forEach(listener => listener());
    }, 5000);
  }, []);

  return { toast, toasts: toastState.toasts };
};
