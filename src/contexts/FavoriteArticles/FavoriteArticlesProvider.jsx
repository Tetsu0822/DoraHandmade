import { useState, useEffect } from 'react';
import { FavoriteArticlesContext } from './FavoriteArticlesContext';

export function FavoriteArticlesProvider({ children }) {
  const [favoriteArticleIds, setFavoriteArticleIds] = useState(() => {
    try {
      const saved = localStorage.getItem('favorite_article_ids');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("解析收藏文章 ID 失敗", error);
      return [];
    }
  });

  const [extraLikes, setExtraLikes] = useState(() => {
    try {
      const saved = localStorage.getItem('article_extra_likes');
      return saved ? JSON.parse(saved) : {}; // 格式如 { "1": 1, "2": 0 }
    } catch (error) {
      console.error("解析文章額外點讚數失敗", error);
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('favorite_article_ids', JSON.stringify(favoriteArticleIds));
  }, [favoriteArticleIds]);

  const toggleFavoriteArticle = (article) => {
    const articleId = article.id;
    const isExist = favoriteArticleIds.includes(articleId);

    setFavoriteArticleIds((prevIds) => {
      if (isExist) {
        return prevIds.filter((id) => id !== articleId);
      }
      return [...prevIds, articleId];
    });

    setExtraLikes(prev => {
      const newExtraLikes = { ...prev };
      if (isExist) {
        delete newExtraLikes[articleId];
      } else {
        newExtraLikes[articleId] = 1;
      }
      return newExtraLikes;
    });
  };

  const isArticleFavorite = (article) => favoriteArticleIds.includes(article.id);

  const value = {
    favoriteArticleIds,
    extraLikes,
    toggleFavoriteArticle,
    isArticleFavorite
  };

  return (
    <FavoriteArticlesContext.Provider value={value}>
      {children}
    </FavoriteArticlesContext.Provider>
  );
}