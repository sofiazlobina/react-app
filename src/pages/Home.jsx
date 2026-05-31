import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1 className="home__title">Добро пожаловать в React App!</h1>
      <p className="home__description">
        Это демонстрационное приложение с использованием React Router, 
        работы с API и управления состоянием через Context API.
      </p>
      <div className="home__features">
        <div className="home__feature">
          <h3>📋 Список постов</h3>
          <p>Просмотр списка постов из JSONPlaceholder API</p>
        </div>
        <div className="home__feature">
          <h3>🔍 Детали</h3>
          <p>Подробная информация о каждом посте</p>
        </div>
        <div className="home__feature">
          <h3>❤️ Избранное</h3>
          <p>Добавляйте посты в избранное</p>
        </div>
      </div>
      <Link to="/list" className="home__btn">
        Перейти к списку
      </Link>
    </div>
  );
};

export default Home;