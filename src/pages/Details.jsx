import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { useAppContext } from '../context/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './Details.css';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleFavorite, isFavorite } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [postData, commentsData] = await Promise.all([
          api.getPostById(id),
          api.getCommentsByPost(id)
        ]);
        setPost(postData);
        setComments(commentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (!post) return <div className="error">Пост не найден</div>;

  return (
    <div className="details">
      <button onClick={() => navigate(-1)} className="details__back">
        ← Назад
      </button>
      
      <article className="details__card">
        <h1 className="details__title">{post.title}</h1>
        <div className="details__meta">
          <span className="details__id">ID: {post.id}</span>
          <span className="details__userId">Автор ID: {post.userId}</span>
        </div>
        <p className="details__body">{post.body}</p>
        
        <div className="details__actions">
          <button 
            onClick={() => toggleFavorite(post)}
            className={`details__btn details__btn--favorite ${isFavorite(post.id) ? 'details__btn--favorited' : ''}`}
          >
            {isFavorite(post.id) ? '❤️ В избранном' : '🤍 Добавить в избранное'}
          </button>
          <Link to="/list" className="details__btn details__btn--list">
            К списку
          </Link>
        </div>
      </article>

      <section className="details__comments">
        <h2 className="details__comments-title">Комментарии ({comments.length})</h2>
        <div className="details__comments-list">
          {comments.map(comment => (
            <div key={comment.id} className="details__comment">
              <h4 className="details__comment-author">{comment.name}</h4>
              <p className="details__comment-email">{comment.email}</p>
              <p className="details__comment-body">{comment.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Details;