import { useAppContext } from '../context/AppContext';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import './List.css';

const List = () => {
  const { posts, loading, error } = useAppContext();

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="list">
      <h1 className="list__title">Список постов</h1>
      <p className="list__subtitle">Всего: {posts.length}</p>
      <div className="list__grid">
        {posts.map(post => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default List;