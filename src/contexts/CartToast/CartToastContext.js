import { createContext, useContext } from 'react';

export const CartToastContext = createContext();

export function useCartToastContext() {
  const context = useContext(CartToastContext);
  // 如果 context 是 undefined，代表該組件不在 Provider 內
  if (!context) {
    throw new Error('useCartToastContext 必須在 CartToastProvider 內使用');
  }
  return context;
}
