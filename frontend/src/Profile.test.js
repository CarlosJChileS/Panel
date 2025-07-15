import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from './components/Profile';

jest.mock('./hooks/useWeather', () => ({
  useWeather: () => ({
    history: ['Manta', 'Quito'],
    editHistoryEntry: jest.fn(),
    deleteHistoryEntry: jest.fn(),
  })
}));

jest.mock('./AuthContext', () => ({
  useAuth: () => ({
    user: { email: 'test@example.com', user_metadata: {} },
    supabase: { auth: { signOut: jest.fn() } }
  }),
}));

test('renders profile page', () => {
  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );
  const logout = screen.getByText(/Cerrar sesión/i);
  expect(logout).toBeInTheDocument();
});

test('toggle dark mode', () => {
  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );
  const checkbox = screen.getByLabelText(/Modo oscuro/i);
  expect(document.body.classList.contains('dark-mode')).toBe(false);
  fireEvent.click(checkbox);
  expect(document.body.classList.contains('dark-mode')).toBe(true);
  document.body.classList.remove('dark-mode');
});

test('shows search history', () => {
  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );
  expect(screen.getByText(/Historial de Búsquedas/i)).toBeInTheDocument();
  expect(screen.getByText('Manta')).toBeInTheDocument();
  expect(screen.getByText('Quito')).toBeInTheDocument();
});

test('filter search history', () => {
  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );
  const filterInput = screen.getByPlaceholderText(/Filtrar/i);
  fireEvent.change(filterInput, { target: { value: 'Qui' } });
  expect(screen.queryByText('Manta')).toBeNull();
  expect(screen.getByText('Quito')).toBeInTheDocument();
});

test('shows edit profile button', () => {
  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );
  expect(screen.getByText(/Editar perfil/i)).toBeInTheDocument();
});

test('shows edit and delete buttons for history', () => {
  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );
  expect(screen.getAllByLabelText(/Editar búsqueda/i).length).toBeGreaterThan(0);
  expect(screen.getAllByLabelText(/Eliminar búsqueda/i).length).toBeGreaterThan(0);
});
