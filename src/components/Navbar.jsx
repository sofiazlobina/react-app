import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import UserMenu from './UserMenu';
import './Navbar.css';

const Navbar = () => {
  const { favorites } = useAppContext();

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar__container">
        <NavLink to="/" className="navbar__brand" aria-label="React App - на главную">
          React App
        </NavLink>
        <ul className="navbar__menu" role="menubar">
          <li className="navbar__item" role="none">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
              role="menuitem"
            >
              Главная
            </NavLink>
          </li>
          <li className="navbar__item" role="none">
            <NavLink 
              to="/list" 
              className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
              role="menuitem"
            >
              Список
            </NavLink>
          </li>
          <li className="navbar__item" role="none">
            <NavLink 
              to="/favorites" 
              className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
              role="menuitem"
            >
              Избранное ({favorites.length})
            </NavLink>
          </li>
          <li className="navbar__item" role="none">
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
              role="menuitem"
            >
              О нас
            </NavLink>
          </li>
        </ul>
        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;
