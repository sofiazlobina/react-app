import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './Card.css';

const Card = memo(({ post }) => {
  const { toggleFavorite, isFavorite } = useAppContext();
  const favorite = isFavorite(post.id);

  return (
    <div className="card">
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
          onClick={() => toggleFavorite(post)}
          className={`card__btn card__btn--favorite ${favorite ? 'card__btn--favorited' : ''}`}
          aria-label={favorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          {favorite ? '❤️ В избранном' : '🤍 Добавить в избранное'}
        </button>
      </div>
    </div>
  );
});

export default Card;
