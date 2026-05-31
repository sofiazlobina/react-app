import { useAppContext } from '../context/AppContext';
import Card from '../components/Card';
import './Favorites.css';

const Favorites = () => {
  const { favorites } = useAppContext();

  return (
    <div className="favorites">
      <h1 className="favorites__title">Избранное</h1>
      {favorites.length === 0 ? (
        <p className="favorites__empty">
          У вас пока нет избранных постов. 
          <a href="/list"> Перейти к списку</a>
        </p>
      ) : (
        <>
          <p className="favorites__subtitle">Всего: {favorites.length}</p>
          <div className="favorites__grid">
            {favorites.map(post => (
              <Card key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;