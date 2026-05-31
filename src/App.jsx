import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Ленивая загрузка страниц
const Home = lazy(() => import('./pages/Home'));
const List = lazy(() => import('./pages/List'));
const Details = lazy(() => import('./pages/Details'));
const About = lazy(() => import('./pages/About'));
const Favorites = lazy(() => import('./pages/Favorites'));

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <Navbar />
        <main className="app__main">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/list" element={<List />} />
              <Route path="/list/:id" element={<Details />} />
              <Route path="/about" element={<About />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </Suspense>
        </main>
        <footer className="app__footer">
          <p>© 2026 React App. Учебный проект.</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
