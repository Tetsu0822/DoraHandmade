import { useState, useEffect, useMemo } from 'react';
import { FavoriteProductsContext } from './FavoriteProductsContext';

export function FavoriteProductsProvider({ children }) {
  const [favoriteProductIds, setFavoriteProductIds] = useState(() => {
    try {
      const saved = localStorage.getItem('favorite_product_ids');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("解析收藏商品 ID 失敗", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorite_product_ids', JSON.stringify(favoriteProductIds));
  }, [favoriteProductIds]);

  const toggleFavoriteProduct = (product) => {
    const productId = product.id;
    setFavoriteProductIds((prevIds) => {
      const isExist = prevIds.includes(productId);
      if (isExist) {
        return prevIds.filter((id) => id !== productId);
      }
      return [...prevIds, productId];
    });
  };

  const isProductFavorite = (product) => favoriteProductIds.includes(product.id);

  const value = useMemo(() => ({
    favoriteProductIds,
    toggleFavoriteProduct,
    isProductFavorite
  }), [favoriteProductIds]);

  return (
    <FavoriteProductsContext.Provider value={value}>
      {children}
    </FavoriteProductsContext.Provider>
  );
}