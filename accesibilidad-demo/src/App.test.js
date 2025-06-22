import { render, screen } from '@testing-library/react';
import App from './presentation/App';
jest.mock('react-leaflet');

test('renders welcome page', () => {
  render(<App />);
  const heading = screen.getByText(/Bienvenido al Dashboard Ambiental Costero/i);
  expect(heading).toBeInTheDocument();
});
