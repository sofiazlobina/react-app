import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { api } from '../api/api';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  // Загружаем из localStorage при инициализации
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Сохраняем в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Загрузка списка постов при монтировании
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await api.getPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Мемоизированная функция добавления/удаления из избранного
  const toggleFavorite = useCallback((post) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === post.id);
      if (exists) {
        return prev.filter(f => f.id !== post.id);
      }
      return [...prev, post];
    });
  }, []);

  // Мемоизированная функция проверки наличия в избранном
  const isFavorite = useCallback((id) => {
    return favorites.some(f => f.id === id);
  }, [favorites]);

  const value = useMemo(() => ({
    posts,
    favorites,
    loading,
    error,
    toggleFavorite,
    isFavorite
  }), [posts, favorites, loading, error, toggleFavorite, isFavorite]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
