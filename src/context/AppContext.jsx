import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/api';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Добавление/удаление из избранного
  const toggleFavorite = (post) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === post.id);
      if (exists) {
        return prev.filter(f => f.id !== post.id);
      }
      return [...prev, post];
    });
  };

  const isFavorite = (id) => favorites.some(f => f.id === id);

  const value = {
    posts,
    favorites,
    loading,
    error,
    toggleFavorite,
    isFavorite
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};