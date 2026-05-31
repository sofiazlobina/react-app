import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import List from './pages/List';
import Details from './pages/Details';
import About from './pages/About';
import Favorites from './pages/Favorites';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <Navbar />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/list/:id" element={<Details />} />
            <Route path="/about" element={<About />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        <footer className="app__footer">
          <p>© 2026 React App. Учебный проект.</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;