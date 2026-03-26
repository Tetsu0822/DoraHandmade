import { createContext, useContext } from 'react';

export const FavoriteArticlesContext = createContext();

export function useFavoriteArticlesContext() {
  const context = useContext(FavoriteArticlesContext);
  if (!context) {
    throw new Error('useFavoriteArticlesContext 必須在 FavoriteArticlesProvider 內使用');
  }
  return context;
}