import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import './Favorites.css';

const Favorites = () => {
  const { favorites, toggleFavorite } = useAppContext();

  const handleRemove = (post) => {
    toggleFavorite(post);
  };

  return (
    <div className="favorites">
      <h1 className="favorites__title">Избранное</h1>
      {favorites.length === 0 ? (
        <p className="favorites__empty">
          У вас пока нет избранных постов. 
          <Link to="/list"> Перейти к списку</Link>
        </p>
      ) : (
        <>
          <p className="favorites__subtitle">Всего: {favorites.length}</p>
          <div className="favorites__grid">
            {favorites.map(post => (
              <div key={post.id} className="card">
                <h3 className="card__title">{post.title}</h3>
                <p className="card__description">
                  {post.body.length > 100 ? `${post.body.substring(0, 100)}...` : post.body}
                </p>
                <div className="card__meta">
                  <span className="card__id">ID: {post.id}</span>
                  <span className="card__userId">User ID: {post.userId}</span>
                </div>
                <div className="card__actions">
                  <Link to={`/list/${post.id}`} className="card__btn card__btn--details">
                    Подробнее
                  </Link>
                  <button 
                    onClick={() => handleRemove(post)}
                    className="card__btn card__btn--remove"
                    aria-label="Удалить из избранного"
                  >
                    ❌ Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
