import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './AuthContext';

jest.mock('./AuthContext', () => ({
  useAuth: jest.fn()
}));

function TestComponent() {
  return <div>Private</div>;
}

test('redirects to login when no user', () => {
  useAuth.mockReturnValue({ user: null });
  render(
    <MemoryRouter initialEntries={["/private"]}>
      <PrivateRoute>
        <TestComponent />
      </PrivateRoute>
    </MemoryRouter>
  );
  expect(screen.queryByText('Private')).not.toBeInTheDocument();
});

test('renders child when user exists', () => {
  useAuth.mockReturnValue({ user: { id: 1 } });
  render(
    <MemoryRouter>
      <PrivateRoute>
        <TestComponent />
      </PrivateRoute>
    </MemoryRouter>
  );
  expect(screen.getByText('Private')).toBeInTheDocument();
});
