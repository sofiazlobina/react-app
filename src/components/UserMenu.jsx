import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './UserMenu.css';

const UserMenu = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return (
      <Link to="/login" className="user-menu__login">
        Войти
      </Link>
    );
  }

  return (
    <div className="user-menu">
      <span className="user-menu__name">
        👤 {user?.name || user?.email}
      </span>
      <button 
        onClick={handleLogout}
        className="user-menu__logout"
        aria-label="Выйти"
      >
        Выйти
      </button>
    </div>
  );
};

export default UserMenu;
