import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './Navbar.css';

const Navbar = () => {
  const { favorites } = useAppContext();

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <NavLink to="/" className="navbar__brand">
          React App
        </NavLink>
        <ul className="navbar__menu">
          <li className="navbar__item">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
            >
              Главная
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink 
              to="/list" 
              className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
            >
              Список
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink 
              to="/favorites" 
              className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
            >
              Избранное ({favorites.length})
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
            >
              О нас
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;