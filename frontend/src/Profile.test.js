import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from './components/Profile';

jest.mock('./hooks/useWeather', () => ({
  useWeather: () => ({ history: ['Manta', 'Quito'] })
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
  const heading = screen.getByText(/Perfil de Usuario/i);
  expect(heading).toBeInTheDocument();
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
