import { createContext, useContext } from 'react';

export const CartActionContext = createContext();

export function useCartActionContext() {
  const context = useContext(CartActionContext);
  // 如果 context 是 undefined，代表該組件不在 Provider 內
  if (!context) {
    throw new Error('useCartActionContext 必須在 CartActionProvider 內使用');
  }
  return context;
}
