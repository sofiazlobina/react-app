import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Перенаправляем если уже авторизован
  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  const from = location.state?.from?.pathname || '/';

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Валидация
    if (!validateEmail(email)) {
      setError('Введите корректный email');
      return;
    }

    if (!validatePassword(password)) {
      setError('Пароль должен содержать не менее 6 символов');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Ошибка входа');
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">Вход в систему</h1>
        
        {error && (
          <div className="login__error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login__form">
          <div className="login__field">
            <label htmlFor="email" className="login__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="login__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="login__field">
            <label htmlFor="password" className="login__label">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              className="login__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              minLength={6}
            />
          </div>

          <button 
            type="submit" 
            className="login__button"
            disabled={isLoading}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <p className="login__footer">
          <Link to="/register" className="login__link">
            Нет аккаунта? Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
