import { createContext, useContext } from 'react';

export const FavoriteProductsContext = createContext();

export function useFavoriteProductsContext() {
  const context = useContext(FavoriteProductsContext);
  if (!context) {
    throw new Error('useFavoriteProductsContext 必須在 FavoriteProductsProvider 內使用');
  }
  return context;
}