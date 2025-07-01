import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from './components/Profile';

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
