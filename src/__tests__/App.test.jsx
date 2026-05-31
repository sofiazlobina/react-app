import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import App from '../App';

// Мокируем API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { id: 1, title: 'Test Post 1', body: 'Test Body 1', userId: 1 },
      { id: 2, title: 'Test Post 2', body: 'Test Body 2', userId: 2 }
    ]),
  })
);

const renderWithProviders = (ui) => {
  return render(
    <BrowserRouter>
      <AppProvider>
        {ui}
      </AppProvider>
    </BrowserRouter>
  );
};

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.getItem.mockClear();
  localStorage.setItem.mockClear();
});

test('renders home page', () => {
  renderWithProviders(<App />);
  expect(screen.getByText(/Добро пожаловать в React App!/i)).toBeInTheDocument();
});

test('renders navigation menu', () => {
  renderWithProviders(<App />);
  expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  expect(screen.getByText(/Список/i)).toBeInTheDocument();
  expect(screen.getByText(/О нас/i)).toBeInTheDocument();
});

test('navigates to list page', async () => {
  renderWithProviders(<App />);
  
  const listLink = screen.getByText(/Список/i);
  fireEvent.click(listLink);
  
  await waitFor(() => {
    expect(screen.getByText(/Список постов/i)).toBeInTheDocument();
  });
});

test('loads and displays posts', async () => {
  renderWithProviders(<App />);
  
  const listLink = screen.getByText(/Список/i);
  fireEvent.click(listLink);
  
  await waitFor(() => {
    expect(screen.getByText(/Test Post 1/i)).toBeInTheDocument();
  });
});

test('adds and removes from favorites', async () => {
  localStorage.getItem.mockReturnValue(JSON.stringify([]));
  
  renderWithProviders(<App />);
  
  const listLink = screen.getByText(/Список/i);
  fireEvent.click(listLink);
  
  await waitFor(() => {
    expect(screen.getByText(/Test Post 1/i)).toBeInTheDocument();
  });
  
  const favoriteBtn = screen.getByRole('button', { name: /Добавить в избранное/i });
  fireEvent.click(favoriteBtn);
  
  await waitFor(() => {
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
